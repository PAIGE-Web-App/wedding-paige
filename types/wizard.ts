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
  subSteps?: WizardStep[];
  fieldsToValidate?: string[];
}

export interface WizardSummary {
  title: string;
  icon?: ReactNode;
  description?: string | ReactNode;
  sections: Array<{
    title?: string;
    items: Array<{
      label: string;
      value: string | ReactNode;
    }>;
  }>;
  illustration?: ReactNode;
}

export interface WizardProps<T extends FieldValues = FieldValues> {
  steps: WizardStep[];
  currentStepIndex: number;
  form: UseFormReturn<T>;
  summary: (data: T) => WizardSummary;
  onStepChange: (stepIndex: number) => void;
  onCancel: () => void;
  onComplete: (data: T) => void | Promise<void>;
  renderStepContent: (step: WizardStep, form: UseFormReturn<T>) => ReactNode;
  canProceed?: (stepIndex: number) => boolean | Promise<boolean>;
}
