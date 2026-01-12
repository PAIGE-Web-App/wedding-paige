"use client";

import { UseFormReturn } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { OnboardingFormData } from "@/types/onboarding";

export function HowYouWorkStep({ form }: { form: UseFormReturn<OnboardingFormData> }) {
    const { control } = form;

    const workStyleOptions = [
        {
            value: "solo",
            title: "SOLO PLANNER / COORDINATOR",
            description: "I manage couples by myself",
            available: true,
        },
        {
            value: "team",
            title: "PLANNING TEAM",
            description: "I collaborate with assistants / co-planners",
            available: false,
            badge: {
                text: "Coming Soon",
                variant: "secondary" as const,
                className: "bg-[#636363] text-background",
            },
        },
    ];

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Tell us how you work</h2>
                <p className="text-muted-foreground">We&apos;ll tailor your defaults and dashboard.</p>
            </div>
            <FormField
                control={control}
                name="work-style"
                render={({ field }) => (
                    <FormItem>
                        <div className="space-y-4">
                            {workStyleOptions.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => option.available && field.onChange(option.value)}
                                    className={`
                                        relative flex items-start gap-4 p-4 rounded-sm border-1 transition-colors
                                        ${option.available
                                            ? `cursor-pointer ${field.value === option.value
                                                ? "border-accent bg-card border-2"
                                                : "border-border bg-muted/30 hover:border-accent/50"
                                            }`
                                            : "bg-muted cursor-not-allowed"
                                        }
                                    `}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Checkbox
                                                checked={field.value === option.value}
                                                onCheckedChange={() => field.onChange(option.value)}
                                                className="shrink-0 mt-0.5"
                                            />
                                            <span className="text-sm uppercase text-foreground font-medium">
                                                {option.title}
                                            </span>
                                            {field.value === option.value && option.available && (
                                                <Badge className="bg-accent text-accent-foreground border-accent ml-auto">
                                                    Selected
                                                </Badge>
                                            )}
                                            {option.badge && (
                                                <Badge variant={option.badge.variant} className={option.badge.className}>
                                                    {option.badge.text}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-left">
                                            {option.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
