"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wizard } from "@/components/onboarding";
import { WizardStep, StepStatus, WizardSummary } from "@/types/wizard";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { SparklesIcon } from "@/components/ui/sparkles-icon";

const onboardingSchema = z.object({
    "your-name": z.string().min(1, "Name is required"),
    "business-name": z.string().optional(),
    "work-style": z.string().min(1, "Please select how you work"),
    "gmail-connect": z.boolean().refine((val) => val === true, {
        message: "Please connect your Gmail account",
    }),
    "vendor-selection": z.string().min(1, "Please select a vendor"),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

const steps: WizardStep[] = [
    {
        id: "profile-setup",
        title: "Profile Setup",
        status: StepStatus.Active,
        subSteps: [
            {
                id: "basic-info",
                title: "Basic Info",
                status: StepStatus.Active,
                fieldsToValidate: ["your-name", "business-name"],
            },
            {
                id: "how-you-work",
                title: "How you work",
                status: StepStatus.Pending,
                fieldsToValidate: ["work-style"],
            },
        ],
    },
    {
        id: "connect-gmail",
        title: "Connect Gmail",
        status: StepStatus.Pending,
        fieldsToValidate: ["gmail-connect"],
    },
    {
        id: "vendor-library",
        title: "Vendor Library",
        status: StepStatus.Pending,
        fieldsToValidate: ["vendor-selection"],
    },
];

function getSummary(data: OnboardingFormData): WizardSummary {
    const sections: WizardSummary["sections"] = [];

    if (data["your-name"] || data["business-name"]) {
        const profileItems: WizardSummary["sections"][0]["items"] = [];

        if (data["your-name"] && data["business-name"]) {
            profileItems.push({
                label: "",
                value: `${data["your-name"]} · ${data["business-name"]}`,
            });
        } else if (data["your-name"]) {
            profileItems.push({
                label: "",
                value: data["your-name"],
            });
        } else if (data["business-name"]) {
            profileItems.push({
                label: "",
                value: data["business-name"],
            });
        }

        sections.push({
            title: "Profile Setup",
            items: profileItems,
        });
    }

    if (data["gmail-connect"]) {
        sections.push({
            title: "Gmail",
            items: [
                {
                    label: "",
                    value: "michellejpark90@gmail.com",
                },
                {
                    label: "",
                    value: "Paige will import conversations from relevant couples and vendors to auto-suggest updates to wedding plans",
                },
            ],
        });
    }

    if (data["vendor-selection"]) {
        const vendorMap: Record<string, { name: string; email: string }> = {
            photographer: { name: "D'Vine Grace Vineyards", email: "mary@dvinegracevineyards.com" },
            caterer: { name: "Elegant Catering Co.", email: "info@elegantcatering.com" },
            florist: { name: "Bloom & Blossom", email: "hello@bloomblossom.com" },
        };

        const vendor = vendorMap[data["vendor-selection"]] || { name: data["vendor-selection"], email: "" };

        sections.push({
            title: "Vendor Library",
            items: [
                {
                    label: "",
                    value: vendor.email ? `${vendor.name} · ${vendor.email}` : vendor.name,
                },
            ],
        });
    }

    return {
        title: "Planning made easy.",
        icon: <SparklesIcon size={10} />,
        description: "Here's how Paige will configure your personalized workspace.",
        sections,
        illustration: (
            <div className="flex items-center justify-center pt-8">
                <Image src="/images/m+p.png" alt="M + P" width={200} height={200} />
            </div>
        ),
    };
}

function renderStepContent(step: WizardStep, form: UseFormReturn<OnboardingFormData>) {
    const { control } = form;

    switch (step.id) {
        case "basic-info":
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

        case "how-you-work":
            return (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">How you work</h2>
                        <p className="text-muted-foreground">Tell us about your work style.</p>
                    </div>
                    <FormField
                        control={control}
                        name="work-style"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    How do you work? <span className="text-destructive">*</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="solo">Solo</SelectItem>
                                        <SelectItem value="team">Team</SelectItem>
                                        <SelectItem value="agency">Agency</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            );

        case "connect-gmail":
            return (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Connect Gmail</h2>
                        <p className="text-muted-foreground">Connect your Gmail to get started.</p>
                    </div>
                    <FormField
                        control={control}
                        name="gmail-connect"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Connect Gmail account <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
            );

        case "vendor-library":
            return (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Vendor Library</h2>
                        <p className="text-muted-foreground">Select vendors from your library.</p>
                    </div>
                    <FormField
                        control={control}
                        name="vendor-selection"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Select Vendor <span className="text-destructive">*</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="photographer">Photographer</SelectItem>
                                        <SelectItem value="caterer">Caterer</SelectItem>
                                        <SelectItem value="florist">Florist</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            );

        default:
            return null;
    }
}

export default function OnboardingPage() {
    const form = useForm<OnboardingFormData>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            "your-name": "",
            "business-name": "",
            "work-style": "",
            "gmail-connect": false,
            "vendor-selection": "",
        },
        mode: "onBlur",
    });

    const handleCancel = () => {
        if (confirm("Are you sure you want to cancel? Your progress will be lost.")) {
            window.location.href = "/";
        }
    };

    const handleComplete = async (data: OnboardingFormData) => {
        console.log("Onboarding complete!", data);
    };

    const handleStepChange = (stepIndex: number) => {
        // Optional: handle step changes
    };

    return (
        <Wizard
            steps={steps}
            currentStepIndex={0}
            form={form}
            summary={getSummary}
            onStepChange={handleStepChange}
            onCancel={handleCancel}
            onComplete={handleComplete}
            renderStepContent={renderStepContent}
        />
    );
}
