"use client";

import { useState, useCallback, useMemo } from "react";
import { FieldValues, Path } from "react-hook-form";
import { WizardProps } from "@/types/wizard";
import { WizardSummary as WizardSummaryPanel } from "./WizardSummary";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function Wizard<T extends FieldValues = FieldValues>({
    steps,
    currentStepIndex: initialStepIndex = 0,
    form,
    summary,
    onComplete,
    renderStepContent,
    canProceed,
}: WizardProps<T>) {
    const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentStep = steps[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    const validateStep = useCallback(
        async (stepIndex: number): Promise<boolean> => {
            if (canProceed) {
                return await canProceed(stepIndex);
            }
            const step = steps[stepIndex];
            const fieldsToValidate = step?.fieldsToValidate;
            return await form.trigger(
                fieldsToValidate?.length ? (fieldsToValidate as Path<T>[]) : undefined
            );
        },
        [form, canProceed, steps]
    );

    const handleNext = useCallback(async () => {
        if (isLastStep) {
            setIsSubmitting(true);
            try {
                if (await form.trigger()) {
                    await onComplete(form.getValues());
                }
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        if (await validateStep(currentStepIndex)) {
            const nextIndex = currentStepIndex + 1;
            setCurrentStepIndex(nextIndex);
        }
    }, [currentStepIndex, isLastStep, form, validateStep, onComplete]);

    const handleBack = useCallback(() => {
        if (currentStepIndex > 0) {
            const prevIndex = currentStepIndex - 1;
            setCurrentStepIndex(prevIndex);
        }
    }, [currentStepIndex]);

    const formValues = form.watch();
    const computedSummary = useMemo(() => summary(formValues), [summary, formValues]);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background gap-4 p-6">
            <Card className="flex flex-1 flex-col overflow-hidden bg-white">
                <CardHeader>
                    <div className="flex items-center w-full justify-between gap-2 mt-2">
                        {steps.map((step, idx) => (
                            <div
                                key={step.id ?? idx}
                                className={cn(
                                    "rounded-full flex-1 h-2 transition-all",
                                    idx < currentStepIndex
                                        ? "bg-accent"
                                        : idx === currentStepIndex
                                            ? "bg-accent/50"
                                            : "bg-muted border border-border"
                                )}
                            />
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                    <Form {...form}>
                        {currentStep && renderStepContent(currentStep, form)}
                    </Form>
                </CardContent>
                <CardFooter className="mx-auto w-full flex-col gap-4">
                    <div className="flex items-center gap-4 w-full">
                        {!isFirstStep && (
                            <Button variant="outline" onClick={handleBack} className="flex-1">
                                Back
                            </Button>
                        )}
                        {currentStep?.customButton ? (
                            currentStep.customButton(handleNext, isSubmitting, isLastStep, isFirstStep)
                        ) : (
                            <Button
                                className={cn(isFirstStep ? "w-full" : "flex-1")}
                                onClick={handleNext}
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Processing..."
                                    : isLastStep
                                        ? "Complete"
                                        : "Continue"}
                            </Button>
                        )}
                    </div>
                    {currentStep?.footerText && (
                        <div className="w-full text-center text-sm text-muted-foreground">
                            {currentStep.footerText}
                        </div>
                    )}
                </CardFooter>
            </Card>

            <WizardSummaryPanel summary={computedSummary} />
        </div>
    );
}