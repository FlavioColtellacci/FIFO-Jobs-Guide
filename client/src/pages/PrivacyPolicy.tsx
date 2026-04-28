import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>How Data Is Handled</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              This website is designed to be informational. We may use lightweight analytics to
              understand page usage and improve content quality.
            </p>
            <p>
              We do not intentionally collect sensitive personal information through the
              calculator or visa filter. If contact forms are introduced, this policy should be
              updated to reflect exactly what is collected and why.
            </p>
            <p>
              Third-party services (such as analytics providers or hosting platforms) may process
              technical data like IP address, browser type, and page interactions according to
              their own privacy policies.
            </p>
            <p>
              If you do not agree with this policy, please discontinue use of the site.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
