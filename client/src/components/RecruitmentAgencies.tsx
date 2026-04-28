import { recruitmentAgencies, visaTypes, type VisaTypeId } from "@/data/fifoJobs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, ExternalLink, CheckCircle2 } from "lucide-react";

/**
 * Design Philosophy: Industrial Blueprint Aesthetic
 * - Grid layout for agency cards
 * - Hexagonal badges for visual consistency
 * - Clear call-to-action buttons
 */

export default function RecruitmentAgencies() {
  const getVisaShortLabel = (visaId: VisaTypeId) => {
    const visa = visaTypes.find((entry) => entry.id === visaId);
    return visa?.shortLabel ?? visaId;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="hexagon-badge bg-primary w-12 h-12 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl">Top Recruitment Agencies</CardTitle>
            <CardDescription className="text-muted-foreground">
              Perth-based agencies supporting FIFO placements across multiple visa pathways
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {recruitmentAgencies.map((agency, index) => (
            <Card key={agency.id} className="bg-muted/30 border-border hover:border-primary transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{agency.name}</h3>
                      {agency.visaFriendly && (
                        <div className="flex items-center gap-1 mt-1">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span className="text-xs text-primary font-semibold">Visa-Friendly Recruiter</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Specialization
                    </p>
                    <p className="text-sm text-foreground font-medium">
                      {agency.specialization}
                    </p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {agency.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {agency.supportedVisaTypes.map((visaId) => (
                      <Badge key={visaId} variant="outline" className="text-[10px]">
                        {getVisaShortLabel(visaId)}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    onClick={() => window.open(`https://${agency.website}`, '_blank')}
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2 font-mono">
                    {agency.website}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Additional Tips */}
        <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border space-y-3">
          <h4 className="font-bold text-foreground flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Application Tips
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Register with multiple agencies to maximize opportunities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Entry-level roles (utilities, camp services, driller's offsider) are most accessible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Employer limits and conditions vary by visa type, so confirm your visa conditions before accepting a contract</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Keep all certifications current and readily available (White Card, First Aid, HR Licence)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Be Perth-based for best chances of securing FIFO work</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
