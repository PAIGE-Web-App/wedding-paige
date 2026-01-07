import { ReactNode } from "react";

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
  groupId?: string;
}

export interface WizardGroup {
  id: string;
  title: string;
  subSteps: WizardStep[];
  status?: StepStatus;
}

export type FieldType = "text" | "email" | "password" | "number" | "textarea" | "select" | "checkbox" | "radio";

export interface WizardField {
  id: string;
  type: FieldType;
  label: string;
  value?: string | number | boolean;
  placeholder?: string;
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    min?: number;
    max?: number;
    message?: string;
  };
  options?: Array<{ label: string; value: string }>;
  helperText?: string;
  error?: string;
}

export interface WizardSummary {
  title: string;
  icon?: ReactNode;
  sections: Array<{
    title?: string;
    items: Array<{
      label: string;
      value: string | ReactNode;
    }>;
  }>;
  illustration?: ReactNode;
}

export interface WizardStepConfig {
  fields: WizardField[];
  description?: string;
  continueButton?: {
    label: string;
    onClick: () => void | Promise<void>;
  };
}

export interface WizardContainerProps {
  groups: WizardGroup[];
  getStepConfig: (stepId: string) => WizardStepConfig | null;
  summary: WizardSummary;
  initialStepIndex?: number;
  onCancel: () => void;
  onFieldChange?: (fieldId: string, value: string | number | boolean) => void;
  onStepChange?: (stepIndex: number) => void;
  onComplete?: () => void;
  additionalActions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost" | "secondary";
  }>;
  banner?: {
    message: string;
    variant?: "info" | "success" | "warning" | "error";
  };
  successMessage?: {
    title: string;
    description: string;
    actionLabel?: string;
    onActionClick?: () => void;
  };
  footerActions?: Array<{
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  }>;
}

