"use client";

import { useState, useMemo } from "react";
import { WizardContainerProps, WizardStep, StepStatus } from "@/types/wizard";
import { WizardNavigation } from "./WizardNavigation";
import { WizardContent } from "./WizardContent";
import { WizardSummary } from "./WizardSummary";
import { Separator } from "@/components/ui/separator";

export function WizardContainer({
  groups: initialGroups,
  getStepConfig,
  summary,
  initialStepIndex = 0,
  onCancel,
  onFieldChange,
  onStepChange,
  onComplete,
  additionalActions,
  banner,
  successMessage,
  footerActions,
}: WizardContainerProps) {
  const [groups, setGroups] = useState(initialGroups);
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);

  const steps: WizardStep[] = useMemo(
    () =>
      groups.flatMap((group) => {
        if (group.subSteps.length > 0) {
          return group.subSteps.map((step) => ({ ...step, groupId: group.id }));
        }
        return [
          {
            id: group.id,
            title: group.title,
            status: group.status || StepStatus.Pending,
          },
        ];
      }),
    [groups]
  );

  const stepIdToIndex = useMemo(
    () => new Map(steps.map((step, index) => [step.id, index])),
    [steps]
  );

  const updateStepStatuses = (
    targetIndex: number,
    getStatus: (stepIndex: number) => StepStatus
  ) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.subSteps.length > 0) {
          return {
            ...group,
            subSteps: group.subSteps.map((step) => {
              const stepIndex = stepIdToIndex.get(step.id);
              return stepIndex !== undefined
                ? { ...step, status: getStatus(stepIndex) }
                : step;
            }),
          };
        }
        const groupIndex = stepIdToIndex.get(group.id);
        return groupIndex !== undefined
          ? { ...group, status: getStatus(groupIndex) }
          : group;
      })
    );
  };

  const handleContinue = async () => {
    if (stepConfig?.continueButton) {
      await stepConfig.continueButton.onClick();
    } else {
      if (currentStepIndex < steps.length - 1) {
        const newIndex = currentStepIndex + 1;
        updateStepStatuses(currentStepIndex, (index) => {
          if (index === currentStepIndex) return StepStatus.Completed;
          if (index === newIndex) return StepStatus.Active;
          return steps[index]?.status || StepStatus.Pending;
        });
        setCurrentStepIndex(newIndex);
        onStepChange?.(newIndex);
      } else {
        onComplete?.();
      }
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1;
      updateStepStatuses(currentStepIndex, (index) => {
        if (index === newIndex) return StepStatus.Active;
        if (index === currentStepIndex) return StepStatus.Pending;
        return steps[index]?.status || StepStatus.Pending;
      });
      setCurrentStepIndex(newIndex);
      onStepChange?.(newIndex);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStepIndex) {
      updateStepStatuses(stepIndex, (index) => {
        if (index < stepIndex) return StepStatus.Completed;
        if (index === stepIndex) return StepStatus.Active;
        return StepStatus.Pending;
      });
      setCurrentStepIndex(stepIndex);
      onStepChange?.(stepIndex);
    }
  };

  const currentStep = steps[currentStepIndex];
  const stepConfig = currentStep ? getStepConfig(currentStep.id) : null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="flex w-full flex-col lg:flex-row">
        <WizardNavigation
          steps={steps}
          groups={groups}
          currentStepIndex={currentStepIndex}
          onStepClick={handleStepClick}
        />
        <Separator orientation="vertical" />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <WizardContent
            title={currentStep.title}
            description={stepConfig?.description || currentStep.description}
            fields={stepConfig?.fields || []}
            currentStepIndex={currentStepIndex}
            totalSteps={steps.length}
            onCancel={onCancel}
            onContinue={handleContinue}
            onBack={handleBack}
            continueButtonLabel={stepConfig?.continueButton?.label}
            onFieldChange={onFieldChange}
            additionalActions={additionalActions}
            banner={banner}
            successMessage={successMessage}
            footerActions={footerActions}
          />
        </div>
        <Separator orientation="vertical" />
        <WizardSummary summary={summary} />
      </div>
    </div>
  );
}

