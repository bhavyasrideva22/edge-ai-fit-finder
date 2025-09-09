import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/types/assessment";
import { ChevronRight } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: number | string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleSubmit = () => {
    if (selectedAnswer !== "") {
      onAnswer(parseInt(selectedAnswer));
    }
  };

  const getSectionColor = () => {
    switch (question.section) {
      case 'psychometric': return 'bg-primary/10 text-primary';
      case 'technical': return 'bg-neural/10 text-neural';
      case 'wiscar': return 'bg-accent/10 text-accent';
      default: return 'bg-muted';
    }
  };

  const getSectionTitle = () => {
    switch (question.section) {
      case 'psychometric': return 'Psychological Assessment';
      case 'technical': return 'Technical Assessment';
      case 'wiscar': return 'WISCAR Framework';
      default: return 'Assessment';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <Badge className={getSectionColor()}>
              {getSectionTitle()}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {questionNumber} of {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-neural">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {question.type === 'likert' && question.scale ? (
                // Likert scale questions
                question.scale.labels.map((label, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={String(index + 1)} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer font-medium"
                    >
                      {label}
                    </Label>
                  </div>
                ))
              ) : (
                // Multiple choice questions
                question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={String(index)} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))
              )}
            </RadioGroup>

            <Button 
              onClick={handleSubmit}
              disabled={selectedAnswer === ""}
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              Next Question
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}