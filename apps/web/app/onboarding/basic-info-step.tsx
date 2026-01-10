"use client";

import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type OnboardingFormData = {
    "your-name": string;
    "business-name"?: string;
    "work-style": string;
    "gmail-connect": boolean;
    vendors: Array<{
        name: string;
        email: string;
        category?: string;
    }>;
};

export function BasicInfoStep({ form }: { form: UseFormReturn<OnboardingFormData> }) {
    const { control } = form;

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Basic Info</h2>
            </div>
            <div className="space-y-6">
                <FormField
                    control={control}
                    name="your-name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Your Name <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="business-name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Business Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter business name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
