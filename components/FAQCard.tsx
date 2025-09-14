import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQCardProps } from "@/types/types";

export const FAQCard = ({
  title,
  faqs,
  icon: Icon,
  defaultOpenIndex = -1,
  className = "",
}: FAQCardProps) => {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {title || "Frequently Asked Questions"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {faqs.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No FAQs available
          </p>
        ) : (
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 transition-all duration-200"
              >
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center text-left p-2"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {faq.icon && <faq.icon className="h-4 w-4" />}
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                {openIndex === index && (
                  <div className="mt-2 pl-6 pr-2 text-sm text-muted-foreground animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
