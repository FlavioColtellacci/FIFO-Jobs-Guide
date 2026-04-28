import { useState } from "react";
import JobsTable from "@/components/JobsTable";
import TaxCalculator from "@/components/TaxCalculator";
import RecruitmentAgencies from "@/components/RecruitmentAgencies";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  HardHat, 
  Calculator, 
  Building2, 
  TrendingUp, 
  MapPin, 
  Clock, 
  DollarSign,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

/**
 * Design Philosophy: Industrial Blueprint Aesthetic
 * - Asymmetric layout with full-width hero
 * - Mining-inspired imagery and color palette
 * - Data-first presentation with high contrast
 * - Technical documentation style
 */

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-sidebar/95 backdrop-blur-sm border-b border-sidebar-border">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="hexagon-badge bg-primary w-10 h-10 flex items-center justify-center">
                <HardHat className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-sidebar-foreground">FIFO Jobs Guide</h1>
                <p className="text-xs text-muted-foreground">417 Visa • Western Australia</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-2">
              <Button
                variant={activeSection === "overview" ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection("overview")}
                className="text-sm"
              >
                Overview
              </Button>
              <Button
                variant={activeSection === "jobs" ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection("jobs")}
                className="text-sm"
              >
                Top 10 Jobs
              </Button>
              <Button
                variant={activeSection === "calculator" ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection("calculator")}
                className="text-sm"
              >
                Tax Calculator
              </Button>
              <Button
                variant={activeSection === "agencies" ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection("agencies")}
                className="text-sm"
              >
                Agencies
              </Button>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/6pQV7aLz38J3K7z1kJ1pgq/sandbox/hPIo64dxvTcgbVntmXFi5X-img-1_1770148776000_na1fn_aGVyby1taW5pbmctc2l0ZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNnBRVjdhTHozOEozSzd6MWtKMXBncS9zYW5kYm94L2hQSW82NGR4dlRjZ2JWbnRtWEZpNVgtaW1nLTFfMTc3MDE0ODc3NjAwMF9uYTFmbl9hR1Z5YnkxdGFXNXBibWN0YzJsMFpRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=WMpASomKW1XRs31pf-97iKwXiGcwv7nf3-TUm6flu-5aLSuIJ8NtABr6Z4FwQlKSqSSvan90dI1FmRfu-eb1KgqnNTrBI7j~jpcyWgCO-1JoBtqpVrpZO6vgewzXYgKcdlxh5LwVITAgBYsfs7L1ASuTihkI0qXQPw4U3cZtBeKwSvha1IWa0UzppU8l~D829fFPnlmbI7zb~4LfyN1RIOMiO5nliGnM3L3Qupew5uuAkWlqCqShK4KfKEPGRoOSZmDbXzbtqy0sEvUdDCfgsL-GwgNXqJ~Jd6-By0dps1TObq2i4Rz7NykvKE5Juh4dBaFG~RDuM7eoaMsH-Owv2A__')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <Badge className="bg-primary text-primary-foreground font-semibold px-4 py-1">
              2026 Market Research
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Your Complete Guide to
              <span className="text-primary block mt-2">FIFO Mining Jobs</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Comprehensive research on the highest-paying entry-level FIFO opportunities in Western Australia for 417 Working Holiday Visa holders. No experience required.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                onClick={() => scrollToSection("jobs")}
              >
                View Top 10 Jobs
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => scrollToSection("calculator")}
              >
                Calculate Your Income
                <Calculator className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <DollarSign className="w-8 h-8 text-primary mx-auto" />
              <p className="text-3xl font-mono font-bold text-foreground">$140k</p>
              <p className="text-sm text-muted-foreground">Highest Entry Salary</p>
            </div>
            <div className="text-center space-y-2">
              <Clock className="w-8 h-8 text-primary mx-auto" />
              <p className="text-3xl font-mono font-bold text-foreground">2:1</p>
              <p className="text-sm text-muted-foreground">Common Roster</p>
            </div>
            <div className="text-center space-y-2">
              <MapPin className="w-8 h-8 text-primary mx-auto" />
              <p className="text-3xl font-mono font-bold text-foreground">Perth</p>
              <p className="text-sm text-muted-foreground">Base Location</p>
            </div>
            <div className="text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
              <p className="text-3xl font-mono font-bold text-foreground">417</p>
              <p className="text-sm text-muted-foreground">Visa Eligible</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section id="overview" className="py-16 bg-background">
        <div className="container mx-auto space-y-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Why FIFO Mining?
            </h2>
            <p className="text-lg text-muted-foreground">
              Fly-In Fly-Out (FIFO) mining jobs in Western Australia offer some of the highest-paying entry-level opportunities for Working Holiday Visa holders. Earn 2-3x more than typical backpacker jobs while gaining valuable experience in Australia's booming mining sector.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card border-border">
              <CardContent className="pt-6 space-y-4">
                <div className="hexagon-badge bg-primary w-12 h-12 flex items-center justify-center mx-auto">
                  <DollarSign className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-center text-foreground">High Salaries</h3>
                <p className="text-muted-foreground text-center">
                  Entry-level roles start from $75k-$140k annually, with net monthly income ranging from $4,896 to $9,229 after tax.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="pt-6 space-y-4">
                <div className="hexagon-badge bg-primary w-12 h-12 flex items-center justify-center mx-auto">
                  <HardHat className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-center text-foreground">No Experience Required</h3>
                <p className="text-muted-foreground text-center">
                  Many roles offer on-the-job training and Certificate II Traineeships. Perfect for career starters.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="pt-6 space-y-4">
                <div className="hexagon-badge bg-primary w-12 h-12 flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-center text-foreground">Great Work-Life Balance</h3>
                <p className="text-muted-foreground text-center">
                  2:1 roster means 14 days on, 7 days off. Accommodation, meals, and flights provided on-site.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Important Notice */}
          <Card className="bg-muted/50 border-primary">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground">Important Information for 417 Visa Holders</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">6-Month Limitation:</strong> You can only work for one employer for a maximum of 6 months. However, working through recruitment agencies on different placements counts as different employers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">Regional Work:</strong> All FIFO mining work in WA counts as "specified work" for second/third visa eligibility.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">Perth-Based:</strong> Most entry-level FIFO roles require you to be based in Perth. Interstate applicants are rarely considered.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">Financial Buffer:</strong> Save at least $5,000 before arriving in Perth to cover initial costs (rent, bond, tickets, medical). Budget $1,500-2,000 for essential tickets (White Card, First Aid, HR Licence).</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Jobs Comparison Section */}
      <section id="jobs" className="py-16 bg-muted/30">
        <div className="container mx-auto space-y-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Top 10 Entry-Level FIFO Jobs
            </h2>
            <p className="text-lg text-muted-foreground">
              Ranked by maximum annual salary. All roles accept 417 visa holders with no prior mining experience.
            </p>
          </div>
          
          <JobsTable />
          
          {/* Roster Explanations */}
          <Card className="bg-card border-border max-w-3xl mx-auto">
            <CardContent className="pt-6 space-y-4">
              <h4 className="font-bold text-foreground">Roster Explanations</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                  <span className="font-mono font-semibold text-foreground">2:1</span>
                  <span className="text-muted-foreground">14 days on, 7 days off</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                  <span className="font-mono font-semibold text-foreground">4:2</span>
                  <span className="text-muted-foreground">28 days on, 14 days off</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                  <span className="font-mono font-semibold text-foreground">8:6</span>
                  <span className="text-muted-foreground">8 days on, 6 days off</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                  <span className="font-mono font-semibold text-foreground">7:7</span>
                  <span className="text-muted-foreground">7 days on, 7 days off</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Tax Calculator Section */}
      <section id="calculator" className="py-16 bg-background">
        <div className="container mx-auto space-y-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Calculate Your Take-Home Pay
            </h2>
            <p className="text-lg text-muted-foreground">
              Use our calculator to estimate your net monthly income based on 2025-2026 Australian tax rates for Working Holiday Makers.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <TaxCalculator />
          </div>
        </div>
      </section>
      
      {/* Recruitment Agencies Section */}
      <section id="agencies" className="py-16 bg-muted/30">
        <div className="container mx-auto space-y-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Where to Apply
            </h2>
            <p className="text-lg text-muted-foreground">
              These Perth-based recruitment agencies specialize in FIFO mining placements and actively work with 417 visa holders.
            </p>
          </div>
          
          <RecruitmentAgencies />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-sidebar border-t border-sidebar-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="hexagon-badge bg-primary w-10 h-10 flex items-center justify-center">
                <HardHat className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-sidebar-foreground">FIFO Jobs Guide</h3>
                <p className="text-xs text-muted-foreground">For 417 Visa Holders in Western Australia</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                Research compiled February 2026
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Data sourced from SEEK, Indeed, ATO, and recruitment agencies
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
