import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Zap, Clock, Target, Users } from "lucide-react";

interface IntroSectionProps {
  onStart: () => void;
}

export function IntroSection({ onStart }: IntroSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-full mb-6 shadow-glow">
            <Brain className="h-5 w-5" />
            <span className="font-semibold">Edge AI Career Assessment</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Should I Learn Edge AI Integration?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover if you're suited for a career in Edge AI development through our comprehensive, 
            scientifically-designed assessment.
          </p>
        </div>

        {/* What is Edge AI Section */}
        <Card className="mb-8 shadow-neural">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              What is Edge AI Integration?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Edge AI Integration combines artificial intelligence algorithms with edge computing hardware 
              to enable real-time data processing close to data sources like IoT devices, mobile phones, 
              and sensors.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-edge mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Low Latency</h4>
                  <p className="text-sm text-muted-foreground">Process data instantly without cloud delays</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-neural mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Model Optimization</h4>
                  <p className="text-sm text-muted-foreground">Compress and optimize AI models for devices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-tech mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">System Integration</h4>
                  <p className="text-sm text-muted-foreground">Connect AI with hardware and software systems</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Paths */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Typical Career Paths</CardTitle>
            <CardDescription>Roles you could pursue in Edge AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Edge AI Engineer", salary: "$95K - $140K", description: "Deploy and optimize AI models on edge devices" },
                { title: "Embedded AI Developer", salary: "$85K - $125K", description: "Integrate AI with hardware components" },
                { title: "IoT Solutions Architect", salary: "$110K - $160K", description: "Design AI-driven IoT solutions" },
                { title: "AI Deployment Specialist", salary: "$90K - $130K", description: "Manage AI deployment pipelines" }
              ].map((role, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{role.title}</h4>
                    <Badge variant="secondary">{role.salary}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Assessment Overview</CardTitle>
            <CardDescription>What you'll discover about yourself</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Psychological Fit</h4>
                <p className="text-sm text-muted-foreground">Interest, persistence, and personality alignment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-neural/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Cpu className="h-6 w-6 text-neural" />
                </div>
                <h4 className="font-semibold mb-2">Technical Readiness</h4>
                <p className="text-sm text-muted-foreground">Current skills and knowledge assessment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">WISCAR Analysis</h4>
                <p className="text-sm text-muted-foreground">Comprehensive readiness framework</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Duration and Start */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
            <Clock className="h-4 w-4" />
            <span>Assessment takes 25-30 minutes</span>
          </div>
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
          >
            Start Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}