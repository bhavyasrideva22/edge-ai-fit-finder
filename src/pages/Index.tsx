import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Cpu, Target, Zap, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8">
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium">AI Career Assessment Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Discover Your Edge AI Future
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Take our scientifically-designed assessment to discover if Edge AI Integration 
              is the perfect career path for you.
            </p>
            
            <Button 
              onClick={() => navigate('/assessment')}
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Psychological Assessment</h3>
            <p className="text-muted-foreground">
              Evaluate your personality traits, interests, and cognitive style for Edge AI work.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-neural/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300">
              <Cpu className="h-8 w-8 text-neural" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Technical Readiness</h3>
            <p className="text-muted-foreground">
              Test your current knowledge in AI, programming, and embedded systems.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300">
              <Target className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-4">WISCAR Framework</h3>
            <p className="text-muted-foreground">
              Comprehensive analysis using Will, Interest, Skill, Cognitive, Ability, and Real-world alignment.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-card/50 backdrop-blur-sm border-y">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25-30</div>
              <div className="text-muted-foreground">Minutes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neural mb-2">95%</div>
              <div className="text-muted-foreground">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">$95K-160K</div>
              <div className="text-muted-foreground">Salary Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-edge mb-2">4</div>
              <div className="text-muted-foreground">Career Paths</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Discover Your Potential?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands who have already discovered their perfect tech career path through our assessment.
        </p>
        <Button 
          onClick={() => navigate('/assessment')}
          size="lg"
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          Begin Your Journey
          <Zap className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
