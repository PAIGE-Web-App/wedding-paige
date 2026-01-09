"use client";

import { useMemo, useState, useEffect } from "react";
import { WizardStep, StepStatus } from "@/types/wizard";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CheckmarkIcon } from "@/components/ui/checkmark-icon";
import Image from "next/image";

interface VerticalStepperProps {
    steps: WizardStep[];
    stepGroups: WizardStep[];
    currentStepIndex: number;
    onStepClick?: (stepIndex: number) => void;
}

export function VerticalStepper({
    steps,
    stepGroups,
    currentStepIndex,
    onStepClick,
}: VerticalStepperProps) {
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
        new Set(stepGroups.map((g) => g.id))
    );

    const stepIdToIndex = useMemo(
        () => new Map(steps.map((step, index) => [step.id, index])),
        [steps]
    );

    const isGroupCompleted = useMemo(() => {
        const completed = new Map<string, boolean>();
        stepGroups.forEach((group) => {
            if (!group.subSteps || group.subSteps.length === 0) {
                completed.set(group.id, group.status === StepStatus.Completed);
            } else {
                completed.set(
                    group.id,
                    group.subSteps.every((step) => {
                        const stepIndex = stepIdToIndex.get(step.id);
                        return stepIndex !== undefined && steps[stepIndex]?.status === StepStatus.Completed;
                    })
                );
            }
        });
        return completed;
    }, [stepGroups, steps, stepIdToIndex]);

    const hasActiveStepInGroup = useMemo(() => {
        const active = new Map<string, boolean>();
        stepGroups.forEach((group) => {
            if (!group.subSteps || group.subSteps.length === 0) {
                const stepIndex = stepIdToIndex.get(group.id);
                active.set(group.id, group.status === StepStatus.Active || stepIndex === currentStepIndex);
            } else {
                active.set(
                    group.id,
                    group.subSteps.some(
                        (step) => step.status === StepStatus.Active || stepIdToIndex.get(step.id) === currentStepIndex
                    )
                );
            }
        });
        return active;
    }, [stepGroups, stepIdToIndex, currentStepIndex, steps]);

    useEffect(() => {
        setExpandedGroups((prev) => {
            const next = new Set(prev);
            stepGroups.forEach((group) => {
                const isComplete = isGroupCompleted.get(group.id) ?? false;
                const hasActive = hasActiveStepInGroup.get(group.id) ?? false;

                if (isComplete && !hasActive) {
                    next.delete(group.id);
                } else if (hasActive) {
                    next.add(group.id);
                }
            });
            return next;
        });
    }, [stepGroups, isGroupCompleted, hasActiveStepInGroup]);

    const getStepStatus = (step: WizardStep, index: number): StepStatus => {
        if (step.status === StepStatus.Completed) return StepStatus.Completed;
        if (step.status === StepStatus.Active || index === currentStepIndex) return StepStatus.Active;
        return StepStatus.Pending;
    };

    const getStatusClasses = (status: StepStatus, size: "sm" | "md" = "md") => {
        const sizeClass = size === "sm" ? "w-[14px] h-[14px]" : "w-[18px] h-[18px]";
        return cn(
            "flex",
            sizeClass,
            "items-center justify-center rounded-full text-xs font-medium shrink-0 outline outline-1",
            status === StepStatus.Completed && "outline-success text-success",
            status === StepStatus.Active && "outline-accent text-accent",
            status === StepStatus.Pending && "outline-gray-300 text-gray-300"
        );
    };

    const toggleGroup = (groupId: string) => {
        setExpandedGroups((prev) => {
            const next = new Set(prev);
            next.has(groupId) ? next.delete(groupId) : next.add(groupId);
            return next;
        });
    };

    const renderStep = (step: WizardStep, index: number, isLastInGroup = false) => {
        const status = getStepStatus(step, index);
        const isCompleted = status === StepStatus.Completed;
        const isActive = status === StepStatus.Active;
        const isPending = status === StepStatus.Pending;
        const canNavigate = index <= currentStepIndex;

        return (
            <li key={step.id} className="relative">
                <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-3 h-5">
                        <div className="flex flex-col items-center">
                            <div className={getStatusClasses(status, "sm")}>
                                {isCompleted ? <CheckmarkIcon /> : null}
                            </div>
                        </div>
                        <button
                            onClick={() => canNavigate && onStepClick?.(index)}
                            className={cn(
                                "flex-1 rounded-md text-left transition-colors",
                                isActive && "font-semibold",
                                isPending && "opacity-60 text-gray-400",
                                canNavigate && !isPending && "hover:bg-muted/50",
                                !canNavigate && "cursor-not-allowed"
                            )}
                            disabled={!canNavigate}
                        >
                            <span className="text-sm">{step.title}</span>
                        </button>
                    </div>
                    {!isLastInGroup && (
                        <div
                            className="w-[0.5px] min-h-[12px] bg-disabled"
                            style={{ marginLeft: "6.5px" }}
                        />
                    )}
                </div>
            </li>
        );
    };

    const renderGroup = (group: WizardStep, groupIndex: number) => {
        const isExpanded = expandedGroups.has(group.id);
        const isGroupComplete = isGroupCompleted.get(group.id) ?? false;
        const hasActiveStep = hasActiveStepInGroup.get(group.id) ?? false;

        if (!group.subSteps || group.subSteps.length === 0) {
            const stepIndex = stepIdToIndex.get(group.id) ?? 0;
            const status: StepStatus = group.status || StepStatus.Pending;
            const isActive = status === StepStatus.Active || stepIndex === currentStepIndex;
            const isPending = status === StepStatus.Pending && stepIndex !== currentStepIndex;
            const canNavigate = stepIndex <= currentStepIndex;

            return (
                <li key={group.id} className="relative">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-3 h-5">
                            <div className="flex flex-col items-center">
                                <div className={getStatusClasses(status)}>
                                    {status === StepStatus.Completed ? <CheckmarkIcon /> : <span>{groupIndex + 1}</span>}
                                </div>
                            </div>
                            <button
                                onClick={() => canNavigate && onStepClick?.(stepIndex)}
                                className={cn(
                                    "flex-1 rounded-md text-left transition-colors",
                                    isActive && "font-semibold",
                                    isPending && "opacity-60 text-gray-400",
                                    canNavigate && !isPending && "hover:bg-muted/50",
                                    !canNavigate && "cursor-not-allowed"
                                )}
                                disabled={!canNavigate}
                            >
                                <span className="text-sm">{group.title}</span>
                            </button>
                        </div>
                    </div>
                </li>
            );
        }

        const sortedGroupSteps = [...group.subSteps].sort(
            (a, b) => (stepIdToIndex.get(a.id) ?? 0) - (stepIdToIndex.get(b.id) ?? 0)
        );

        return (
            <li key={group.id}>
                <div className="flex flex-row gap-3 h-5">
                    <div className="flex flex-col items-center">
                        <div className={getStatusClasses(isGroupComplete ? StepStatus.Completed : StepStatus.Active)}>
                            {isGroupComplete ? <CheckmarkIcon /> : <span>{groupIndex + 1}</span>}
                        </div>
                    </div>
                    <button
                        onClick={() => toggleGroup(group.id)}
                        className={cn(
                            "flex flex-1 items-center gap-2 rounded-md text-left transition-colors",
                            hasActiveStep && "font-semibold",
                            !hasActiveStep && "hover:bg-muted/50"
                        )}
                    >
                        <span className="flex-1 text-sm">{group.title}</span>
                        {isExpanded ? (
                            <ChevronUp className="size-4 text-muted-foreground" />
                        ) : (
                            <ChevronDown className="size-4 text-muted-foreground" />
                        )}
                    </button>
                </div>
                {isExpanded && sortedGroupSteps.length > 0 && (
                    <div
                        className="w-[0.5px] min-h-[12px] bg-disabled"
                        style={{ marginLeft: "8.5px" }}
                    />
                )}
                {isExpanded && (
                    <ul className="space-y-0 ml-[2px]">
                        {sortedGroupSteps.map((step, idx) => {
                            const stepIndex = stepIdToIndex.get(step.id) ?? 0;
                            return renderStep(step, stepIndex, idx === sortedGroupSteps.length - 1);
                        })}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <div className="flex w-full flex-col bg-muted/30 lg:w-[280px] lg:min-w-[280px] gap-7">
            <div className="px-6 pt-6">
                <Image
                    src="/images/logo.png"
                    alt="Paige+"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                />
            </div>
            <nav className="flex-1 overflow-y-auto px-6 pt-0.5">
                <ul className="space-y-4">
                    {stepGroups.map((group, index) => renderGroup(group, index))}
                </ul>
            </nav>
        </div>
    );
}

