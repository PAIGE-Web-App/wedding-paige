"use client";

import { WizardSummary as WizardSummaryType } from "@/types/wizard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface WizardSummaryProps {
    summary: WizardSummaryType;
}

export function WizardSummary({ summary }: WizardSummaryProps) {
    return (
        <div className="hidden w-full flex-col bg-muted/20 lg:flex lg:w-[320px] lg:min-w-[320px]">
            <div className="flex flex-1 flex-col overflow-y-auto p-6">
                <div className="mb-6">
                    <div className="flex items-center gap-2">
                        {summary.icon || <Sparkles className="size-5" />}
                        <h3 className="text-lg font-semibold">{summary.title}</h3>
                    </div>
                </div>

                <div className="flex-1 space-y-6">
                    {summary.sections.map((section, sectionIndex) => (
                        <Card key={sectionIndex}>
                            {section.title && (
                                <CardHeader>
                                    <CardTitle className="text-base">{section.title}</CardTitle>
                                </CardHeader>
                            )}
                            <CardContent className="space-y-3">
                                {section.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="space-y-1">
                                        <div className="text-sm font-medium text-muted-foreground">
                                            {item.label}:
                                        </div>
                                        <div className="text-sm">{item.value}</div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {summary.illustration && (
                    <div className="mt-auto pt-6">{summary.illustration}</div>
                )}
            </div>
        </div>
    );
}

