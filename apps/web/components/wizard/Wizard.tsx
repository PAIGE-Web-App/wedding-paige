"use client";

import { useState, useCallback, useMemo } from "react";
import { FieldValues, Path } from "react-hook-form";
import { WizardProps, StepStatus } from "@/types/wizard";
import { VerticalStepper } from "./VerticalStepper";
import { WizardSummary as WizardSummaryPanel } from "./WizardSummary";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "../ui/card";

function getStepStatus(index: number, currentIndex: number): StepStatus {
    if (index < currentIndex) return StepStatus.Completed;
    if (index === currentIndex) return StepStatus.Active;
    return StepStatus.Pending;
}

export function Wizard<T extends FieldValues = FieldValues>({
    steps: stepGroups,
    currentStepIndex: initialStepIndex = 0,
    form,
    summary,
    onComplete,
    renderStepContent,
    canProceed,
}: WizardProps<T>) {
    const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const flatSteps = useMemo(() => stepGroups.flatMap((step) => step.subSteps?.length ? step.subSteps : [step]), [stepGroups]);
    const stepIdToIndex = useMemo(
        () => new Map(flatSteps.map((step, index) => [step.id, index])),
        [flatSteps]
    );
    const currentStep = flatSteps[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === flatSteps.length - 1;

    const validateStep = useCallback(
        async (stepIndex: number): Promise<boolean> => {
            if (canProceed) {
                return await canProceed(stepIndex);
            }
            const step = flatSteps[stepIndex];
            const fieldsToValidate = step?.fieldsToValidate;
            return await form.trigger(
                fieldsToValidate?.length ? (fieldsToValidate as Path<T>[]) : undefined
            );
        },
        [form, canProceed, flatSteps]
    );

    const handleStepClick = useCallback(
        async (stepIndex: number) => {
            if (stepIndex === currentStepIndex) return;

            if (stepIndex < currentStepIndex) {
                setCurrentStepIndex(stepIndex);
                return;
            }

            if (await validateStep(currentStepIndex)) {
                setCurrentStepIndex(stepIndex);
            }
        },
        [currentStepIndex, validateStep]
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

    const updatedStepGroups = useMemo(() => {
        return stepGroups.map((stepGroup) => {
            if (stepGroup.subSteps?.length) {
                const subStepIndices = stepGroup.subSteps.map((subStep) => stepIdToIndex.get(subStep.id) ?? -1);
                const allSubStepsCompleted = subStepIndices.every((idx) => idx < currentStepIndex);
                const hasActiveSubStep = subStepIndices.some((idx) => idx === currentStepIndex);

                return {
                    ...stepGroup,
                    status: allSubStepsCompleted
                        ? StepStatus.Completed
                        : hasActiveSubStep
                            ? StepStatus.Active
                            : StepStatus.Pending,
                    subSteps: stepGroup.subSteps.map((subStep) => ({
                        ...subStep,
                        status: getStepStatus(stepIdToIndex.get(subStep.id) ?? -1, currentStepIndex),
                    })),
                };
            }
            return {
                ...stepGroup,
                status: getStepStatus(stepIdToIndex.get(stepGroup.id) ?? -1, currentStepIndex),
            };
        });
    }, [stepGroups, stepIdToIndex, currentStepIndex]);

    const updatedSteps = useMemo(() => {
        return flatSteps.map((step, index) => ({
            ...step,
            status: getStepStatus(index, currentStepIndex),
        }));
    }, [flatSteps, currentStepIndex]);

    const formValues = form.watch();
    const computedSummary = useMemo(() => summary(formValues), [summary, formValues]);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background gap-4">
            <VerticalStepper
                steps={updatedSteps}
                stepGroups={updatedStepGroups}
                currentStepIndex={currentStepIndex}
                onStepClick={handleStepClick}
            />
            <Card className="flex flex-1 flex-col overflow-hidden bg-white my-6">
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