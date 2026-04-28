import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Disclaimer() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold text-foreground">Disclaimer</h1>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Informational Content Only</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              FIFO Jobs Guide provides general information about job research, salary ranges,
              visa pathways, and tax scenarios in Australia. It is not legal, migration,
              employment, or tax advice.
            </p>
            <p>
              Salary, roster, and eligibility information may change by employer, project site,
              market conditions, and government policy updates. No guarantee is made that a
              listed role is currently available or suitable for your circumstances.
            </p>
            <p>
              Visa rules and tax obligations are complex and can vary by your nationality,
              residency status, study load, sponsorship, and treaty arrangements. Always verify
              current rules with official government sources and licensed professionals.
            </p>
            <p>
              By using this website, you agree that you are responsible for your own decisions
              and due diligence before acting on any information presented here.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
