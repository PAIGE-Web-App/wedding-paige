"use client";

import { WizardSummary as WizardSummaryType } from "@/types/wizard";
import { Separator } from "../ui/separator";
import { Card, CardHeader, CardContent, CardFooter, CardDescription } from "../ui/card";

interface WizardSummaryProps {
    summary: WizardSummaryType;
}

export function WizardSummary({ summary }: WizardSummaryProps) {
    return (
        <Card className="my-6 mr-6 w-full flex-col bg-white lg:flex lg:w-[400px] lg:min-w-[400px]">
            <CardHeader>
                <div className="flex items-center gap-2">
                    {summary.icon}
                    <h1 className="text-base font-medium leading-none tracking-normal">{summary.title}</h1>
                </div>
                {summary.description && (
                    <>
                        <CardDescription className="mt-4">
                            {summary.description}
                        </CardDescription>
                        <Separator className="mt-6" />
                    </>
                )}
            </CardHeader>

            <CardContent className="flex-1 space-y-6">
                {summary.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        {section.title && (
                            <div className="text-base font-medium">{section.title}</div>
                        )}
                        <div className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="space-y-1">
                                    {item.label && (
                                        <div className="text-sm font-medium text-muted-foreground">
                                            {item.label}:
                                        </div>
                                    )}
                                    <div className="text-sm">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>

            {summary.illustration && (
                <CardFooter className="mt-auto justify-center">{summary.illustration}</CardFooter>
            )}
        </Card>
    );
}

