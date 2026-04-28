import { useState } from "react";
import { fifoJobs, visaTypes, type VisaTypeId } from "@/data/fifoJobs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trackEvent } from "@/lib/analytics";

/**
 * Design Philosophy: Industrial Blueprint Aesthetic
 * - Data-first presentation with high contrast
 * - Sortable columns for power users
 * - Hexagonal badges for job roles
 * - Monospaced salary figures
 */

type SortField = 'title' | 'salaryMin' | 'salaryMax' | 'netMonthlyMin';
type SortDirection = 'asc' | 'desc';
type VisaFilter = "all" | VisaTypeId;

export default function JobsTable() {
  const [sortField, setSortField] = useState<SortField>('salaryMax');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<VisaFilter>("all");
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const filteredJobs = fifoJobs.filter((job) =>
    selectedVisa === "all" ? true : job.eligibleVisaTypes.includes(selectedVisa)
  );

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getVisaShortLabel = (visaId: VisaTypeId) => {
    const visa = visaTypes.find((entry) => entry.id === visaId);
    return visa?.shortLabel ?? visaId;
  };
  
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="hexagon-badge bg-primary w-12 h-12 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl">Top 10 FIFO Jobs Comparison</CardTitle>
            <CardDescription className="text-muted-foreground">
              Multi-visa eligible entry-level roles in WA FIFO • Click columns to sort
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{sortedJobs.length}</span> roles
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Visa filter</span>
            <Select
              value={selectedVisa}
              onValueChange={(value) => {
                const nextVisa = value as VisaFilter;
                setSelectedVisa(nextVisa);
                trackEvent("visa_filter_used", {
                  visa_type: nextVisa,
                });
              }}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select visa type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All visa pathways</SelectItem>
                {visaTypes.map((visa) => (
                  <SelectItem key={visa.id} value={visa.id}>
                    {visa.shortLabel} - {visa.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-primary">
                <th className="text-left py-4 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('title')}
                    className="font-semibold text-sm uppercase tracking-wide hover:text-primary"
                  >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-right py-4 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('salaryMax')}
                    className="font-semibold text-sm uppercase tracking-wide hover:text-primary"
                  >
                    Annual Salary
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-right py-4 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('netMonthlyMin')}
                    className="font-semibold text-sm uppercase tracking-wide hover:text-primary"
                  >
                    Net Monthly
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-center py-4 px-4">
                  <span className="font-semibold text-sm uppercase tracking-wide">
                    Roster
                  </span>
                </th>
                <th className="text-center py-4 px-4">
                  <span className="font-semibold text-sm uppercase tracking-wide">
                    Eligibility
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedJobs.map((job, index) => (
                <tr
                  key={job.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{job.title}</p>
                        {expandedJob === job.id && (
                          <p className="text-xs text-muted-foreground mt-1 max-w-md">
                            {job.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="font-mono">
                      <p className="text-lg font-semibold text-foreground">
                        {formatCurrency(job.salaryMax)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="font-mono">
                      <p className="text-lg font-semibold text-primary">
                        {formatCurrency(job.netMonthlyMax)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        after tax
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant="outline" className="font-mono">
                      {job.roster}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {job.eligibleVisaTypes.slice(0, 2).map((visaId) => (
                        <Badge
                          key={visaId}
                          variant={selectedVisa === visaId ? "default" : "secondary"}
                          className="text-[10px]"
                        >
                          {getVisaShortLabel(visaId)}
                        </Badge>
                      ))}
                      {job.eligibleVisaTypes.length > 2 && (
                        <Badge variant="outline" className="text-[10px]">
                          +{job.eligibleVisaTypes.length - 2}
                        </Badge>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {sortedJobs.map((job, index) => (
            <Card key={job.id} className="bg-muted/30 border-border">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded bg-primary/20 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-1 mt-1">
                        <Badge variant="outline" className="font-mono text-xs">
                          {job.roster}
                        </Badge>
                        {job.eligibleVisaTypes.slice(0, 2).map((visaId) => (
                          <Badge
                            key={visaId}
                            variant={selectedVisa === visaId ? "default" : "secondary"}
                            className="text-[10px]"
                          >
                            {getVisaShortLabel(visaId)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Annual Salary</p>
                    <p className="font-mono font-semibold text-foreground">
                      {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Net Monthly</p>
                    <p className="font-mono font-semibold text-primary">
                      {formatCurrency(job.netMonthlyMax)}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {job.tickets.slice(0, 3).map((ticket, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {ticket}
                    </Badge>
                  ))}
                  {job.tickets.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{job.tickets.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {job.eligibleVisaTypes.map((visaId) => (
                    <Badge
                      key={visaId}
                      variant={selectedVisa === visaId ? "default" : "outline"}
                      className="text-[10px]"
                    >
                      Eligible: {getVisaShortLabel(visaId)}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
