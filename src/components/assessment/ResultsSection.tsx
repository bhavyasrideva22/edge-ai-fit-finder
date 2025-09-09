import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProgressRing } from "@/components/ui/progress-ring";
import { AssessmentResult } from "@/types/assessment";
import { 
  Brain, 
  Cpu, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Lightbulb,
  ArrowRight,
  Star
} from "lucide-react";

interface ResultsSectionProps {
  results: AssessmentResult;
  onRestart: () => void;
}

export function ResultsSection({ results, onRestart }: ResultsSectionProps) {
  const getRecommendationConfig = () => {
    switch (results.recommendation) {
      case 'yes':
        return {
          icon: CheckCircle,
          color: 'text-edge',
          bgColor: 'bg-edge/10',
          title: 'Excellent Fit!',
          subtitle: 'You show strong potential for Edge AI integration'
        };
      case 'maybe':
        return {
          icon: AlertCircle,
          color: 'text-tech',
          bgColor: 'bg-tech/10',
          title: 'Promising Potential',
          subtitle: 'With focused preparation, you could succeed'
        };
      case 'no':
        return {
          icon: XCircle,
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          title: 'Consider Alternatives',
          subtitle: 'Other tech paths might be a better fit'
        };
    }
  };

  const recConfig = getRecommendationConfig();
  const RecommendationIcon = recConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Your Edge AI Assessment Results
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive analysis of your fit for Edge AI development
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className={`mb-8 shadow-neural ${recConfig.bgColor} border-2`}>
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-full ${recConfig.bgColor} flex items-center justify-center`}>
                <RecommendationIcon className={`h-8 w-8 ${recConfig.color}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{recConfig.title}</h2>
                <p className="text-muted-foreground">{recConfig.subtitle}</p>
              </div>
              <div className="ml-auto">
                <ProgressRing progress={results.overallConfidence} size={100}>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{results.overallConfidence}%</div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                </ProgressRing>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-neural">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5 text-primary" />
                Psychological Fit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{results.psychometricScore}%</span>
                <Badge variant={results.psychometricScore >= 70 ? "default" : "secondary"}>
                  {results.psychometricScore >= 70 ? "Strong" : results.psychometricScore >= 50 ? "Moderate" : "Developing"}
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full"
                  style={{ width: `${results.psychometricScore}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-neural">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Cpu className="h-5 w-5 text-neural" />
                Technical Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{results.technicalScore}%</span>
                <Badge variant={results.technicalScore >= 70 ? "default" : "secondary"}>
                  {results.technicalScore >= 70 ? "Ready" : results.technicalScore >= 50 ? "Developing" : "Foundation"}
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-neural h-2 rounded-full"
                  style={{ width: `${results.technicalScore}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-neural">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-accent" />
                WISCAR Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(results.wiscarScores).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="capitalize">{key}:</span>
                    <span className="font-semibold">{value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="mb-8 shadow-neural">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-tech" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 shadow-neural">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-edge" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Paths */}
        <Card className="mb-8 shadow-neural">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-tech" />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {results.careerPaths.map((path, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{path.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{path.fitScore}% fit</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-edge">{path.salary}</span>
                    <div className="flex flex-wrap gap-1">
                      {path.requiredSkills.slice(0, 2).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4">
          <Button 
            onClick={onRestart}
            variant="outline"
            size="lg"
          >
            Take Assessment Again
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>Questions about your results? Connect with our career advisors for personalized guidance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}