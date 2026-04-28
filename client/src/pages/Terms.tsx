import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold text-foreground">Terms of Use</h1>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Use of This Website</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              FIFO Jobs Guide is provided on an "as is" basis for general information purposes.
              Content may be updated, removed, or changed without notice.
            </p>
            <p>
              You are responsible for verifying all job, visa, and tax information with official
              or professional sources before making career or financial decisions.
            </p>
            <p>
              We are not liable for losses or damages resulting from the use of this website,
              including reliance on salary ranges, visa notes, recruiter details, or calculator
              outputs.
            </p>
            <p>
              Continued use of this website indicates acceptance of these terms.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
