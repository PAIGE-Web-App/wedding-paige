import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export enum StepStatus {
    Completed = "completed",
    Active = "active",
    Pending = "pending",
}

export interface WizardStep {
    id: string;
    title: string;
    status: StepStatus;
    description?: string;
    fieldsToValidate?: string[];
    customButton?: (handleNext: () => Promise<void>, isSubmitting: boolean, isLastStep: boolean, isFirstStep: boolean) => ReactNode;
    footerText?: ReactNode;
}

export interface WizardSummary {
    title: string;
    icon?: ReactNode;
    description?: string | ReactNode;
    sections: Array<{
        title?: string;
        items: Array<string | ReactNode>;
    }>;
    illustration?: ReactNode;
}

export interface WizardProps<T extends FieldValues = FieldValues> {
    steps: WizardStep[];
    currentStepIndex: number;
    form: UseFormReturn<T>;
    summary: (data: T) => WizardSummary;
    onComplete: (data: T) => void | Promise<void>;
    renderStepContent: (step: WizardStep, form: UseFormReturn<T>) => ReactNode;
    canProceed?: (stepIndex: number) => boolean | Promise<boolean>;
}