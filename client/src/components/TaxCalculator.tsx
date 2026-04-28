import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calculator } from "lucide-react";

/**
 * Design Philosophy: Industrial Blueprint Aesthetic
 * - Monospaced numbers (JetBrains Mono) for precision
 * - High-contrast data display
 * - Real-time calculation updates
 * - Technical documentation style
 */

interface TaxResult {
  grossAnnual: number;
  incomeTax: number;
  medicareLevy: number;
  totalTax: number;
  netAnnual: number;
  netMonthly: number;
  effectiveTaxRate: number;
}

function calculateWHMTax(grossAnnual: number): number {
  if (grossAnnual <= 0) return 0;
  
  if (grossAnnual <= 45000) {
    return grossAnnual * 0.15;
  } else if (grossAnnual <= 135000) {
    return 6750 + (grossAnnual - 45000) * 0.30;
  } else if (grossAnnual <= 190000) {
    return 33750 + (grossAnnual - 135000) * 0.37;
  } else {
    return 54100 + (grossAnnual - 190000) * 0.45;
  }
}

function calculateMedicareLevy(grossAnnual: number, isExempt: boolean): number {
  if (isExempt) return 0;
  return grossAnnual * 0.02;
}

function calculateTax(grossAnnual: number, medicareExempt: boolean): TaxResult {
  const incomeTax = calculateWHMTax(grossAnnual);
  const medicareLevy = calculateMedicareLevy(grossAnnual, medicareExempt);
  const totalTax = incomeTax + medicareLevy;
  const netAnnual = grossAnnual - totalTax;
  const netMonthly = netAnnual / 12;
  const effectiveTaxRate = grossAnnual > 0 ? (totalTax / grossAnnual) * 100 : 0;
  
  return {
    grossAnnual,
    incomeTax,
    medicareLevy,
    totalTax,
    netAnnual,
    netMonthly,
    effectiveTaxRate
  };
}

export default function TaxCalculator() {
  const [salary, setSalary] = useState<string>("110000");
  const [medicareExempt, setMedicareExempt] = useState<boolean>(true);
  
  const grossAnnual = parseFloat(salary.replace(/,/g, '')) || 0;
  const result = calculateTax(grossAnnual, medicareExempt);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatCurrencyDetailed = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="hexagon-badge bg-primary w-12 h-12 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl">WHM Tax Calculator</CardTitle>
            <CardDescription className="text-muted-foreground">
              Calculate your net take-home pay for 2025-2026
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="salary" className="text-sm font-medium">
              Gross Annual Salary (AUD)
            </Label>
            <Input
              id="salary"
              type="text"
              value={salary}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setSalary(value);
              }}
              className="font-mono text-lg bg-input border-border"
              placeholder="110000"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
            <div className="space-y-0.5">
              <Label htmlFor="medicare-exempt" className="text-sm font-medium">
                Medicare Levy Exempt
              </Label>
              <p className="text-xs text-muted-foreground">
                417 visa holders are typically exempt
              </p>
            </div>
            <Switch
              id="medicare-exempt"
              checked={medicareExempt}
              onCheckedChange={setMedicareExempt}
            />
          </div>
        </div>
        
        {/* Results Section */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Income Tax
              </p>
              <p className="text-xl font-mono font-semibold text-foreground">
                {formatCurrency(result.incomeTax)}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Medicare Levy
              </p>
              <p className="text-xl font-mono font-semibold text-foreground">
                {formatCurrency(result.medicareLevy)}
                {medicareExempt && (
                  <span className="text-xs text-primary ml-2">EXEMPT</span>
                )}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Total Tax
              </p>
              <p className="text-xl font-mono font-semibold text-destructive">
                {formatCurrency(result.totalTax)}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Effective Rate
              </p>
              <p className="text-xl font-mono font-semibold text-foreground">
                {result.effectiveTaxRate.toFixed(2)}%
              </p>
            </div>
          </div>
          
          {/* Net Income Highlight */}
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 space-y-3">
            <div className="space-y-1">
              <p className="text-sm text-primary uppercase tracking-wide font-semibold">
                Net Annual Income
              </p>
              <p className="text-3xl font-mono font-bold text-foreground">
                {formatCurrency(result.netAnnual)}
              </p>
            </div>
            
            <div className="schematic-line h-0.5 my-4"></div>
            
            <div className="space-y-1">
              <p className="text-sm text-primary uppercase tracking-wide font-semibold">
                Net Monthly Income
              </p>
              <p className="text-4xl font-mono font-bold text-primary">
                {formatCurrencyDetailed(result.netMonthly)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Tax Brackets Info */}
        <div className="text-xs text-muted-foreground space-y-2 pt-4 border-t border-border">
          <p className="font-semibold text-foreground">2025-2026 WHM Tax Brackets:</p>
          <ul className="space-y-1 font-mono">
            <li>$0 - $45,000: <span className="text-primary">15%</span></li>
            <li>$45,001 - $135,000: <span className="text-primary">$6,750 + 30%</span> over $45k</li>
            <li>$135,001 - $190,000: <span className="text-primary">$33,750 + 37%</span> over $135k</li>
            <li>$190,001+: <span className="text-primary">$54,100 + 45%</span> over $190k</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
