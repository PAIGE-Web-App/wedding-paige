"use client";

import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wizard } from "@/components/wizard";
import { WizardStep, StepStatus, WizardSummary } from "@/types/wizard";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { SparklesIcon } from "@/components/ui/sparkles-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash, CirclePlus } from "lucide-react";

const vendorSchema = z.object({
    name: z.string().min(1, "Vendor name is required"),
    email: z.email({ message: "Please enter a valid email address" }).min(1, "Vendor email is required"),
    category: z.string().optional(),
});

const onboardingSchema = z.object({
    "your-name": z.string().min(1, "Name is required"),
    "business-name": z.string().optional(),
    "work-style": z.string().min(1, "Please select how you work"),
    "gmail-connect": z.boolean().refine((val) => val === true, {
        message: "Please connect your Gmail account",
    }),
    vendors: z.array(vendorSchema),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

function getSummary(data: OnboardingFormData): WizardSummary {
    const sections: WizardSummary["sections"] = [];

    const profileItems = [
        data["your-name"],
        data["business-name"]
    ].filter(Boolean);

    if (profileItems.length > 0) {
        sections.push({
            title: "Profile Setup",
            items: [profileItems.join(" · ")],
        });
    }

    if (data["gmail-connect"]) {
        sections.push({
            title: "Gmail",
            items: [
                "michellejpark90@gmail.com",
                "Paige will import conversations from relevant couples and vendors to auto-suggest updates to wedding plans",
            ],
        });
    }

    if (data.vendors && data.vendors.length > 0) {
        sections.push({
            title: "Vendor Library",
            items: data.vendors.map((vendor) =>
                vendor.category
                    ? `${vendor.name} · ${vendor.email} · ${vendor.category}`
                    : `${vendor.name} · ${vendor.email}`
            ),
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

function VendorLibraryContent({ form }: { form: UseFormReturn<OnboardingFormData> }) {
    const { control } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "vendors",
    });

    const handleAddVendor = () => {
        append({ name: "", email: "", category: "" });
    };

    const handleVerifyEmail = (index: number) => {
        console.log("Verify email for vendor", index);
    };

    const categories = [
        "Photographer",
        "Caterer",
        "Florist",
        "Venue",
        "DJ",
        "Baker",
        "Planner",
        "Other",
    ];

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Vendor Library</h2>
                <p className="text-muted-foreground">
                    Add vendors that you work with to your Library so that you can easily add them to your couple&apos;s plan. Added vendors can always be updated in your Vendors area in the dashboard.
                </p>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-foreground">
                    Verifying vendor email addresses allows Paige to look for existing conversations to personalize setup.
                </AlertDescription>
            </Alert>

            <div className="space-y-2">
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <Card key={field.id} className="border rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium">Vendor {index + 1}</h3>
                                {fields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => remove(index)}
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    control={control}
                                    name={`vendors.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Vendor Name <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Vendor Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex gap-2">
                                    <FormField
                                        control={control}
                                        name={`vendors.${index}.email`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>
                                                    Vendor Email <span className="text-destructive">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Vendor Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex items-end pb-0">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => handleVerifyEmail(index)}
                                            className="whitespace-nowrap px-12"
                                        >
                                            Verify
                                        </Button>
                                    </div>
                                </div>

                                <FormField
                                    control={control}
                                    name={`vendors.${index}.category`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </Card>
                    ))}
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleAddVendor}
                    className="justify-start text-accent hover:text-accent hover:bg-accent/10"
                >
                    <CirclePlus className="h-4 w-4" />
                    Add Vendor
                </Button>
            </div>
        </div>
    );
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

        case "connect-gmail":
            return (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Connect Gmail</h2>
                        <p className="text-muted-foreground">Paige reads relevant conversations you import and drafts updates for your approval.</p>
                    </div>
                    <FormField
                        control={control}
                        name="gmail-connect"
                        render={({ field }) => (
                            <>
                                <Card className="border-accent/30 bg-[#FAF3FF]">
                                    <CardContent className=" space-y-6">
                                        <div className="flex items-center gap-2">
                                            <SparklesIcon />
                                            <h3 className="font-semibold">How does this work?</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <h4 className="font-semibold">Paige drafts. You stay in control.</h4>
                                                <p className="text-sm text-muted-foreground">Paige reads relevant emails and suggests replies, tasks, and updates - but nothing is sent or applied without your approval.</p>
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-semibold">Send emails directly from Paige</h4>
                                                <p className="text-sm text-muted-foreground">Draft and send emails to vendors inside Paige using your Gmail account. Messages are sent from your email address, just like Gmail.</p>
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-semibold">You control what Paige can see</h4>
                                                <p className="text-sm text-muted-foreground">Choose which conversations Paige can access. You can exclude personal or unrelated emails anytime.</p>
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-semibold">Disconnect anytime</h4>
                                                <p className="text-sm text-muted-foreground">You can pause or disconnect Gmail access whenever you want — no lock-in.</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-center pt-2 w-full">
                                            <Button
                                                type="button"
                                                variant="outline" className="w-full"
                                            >
                                                <Image src="/images/youtube-icon.png" alt="YouTube" width={20} height={20} className="mr-2" />
                                                Watch a Demo
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                                <FormItem className="hidden">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                </div>
            );

        case "vendor-library":
            return <VendorLibraryContent form={form} />;

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
            "work-style": "solo",
            "gmail-connect": false,
            vendors: [{ name: "", email: "", category: "" }],
        },
        mode: "onBlur",
    });

    const handleComplete = async (data: OnboardingFormData) => {
        console.log("Onboarding complete!", data);
    };

    const handleGmailConnect = async (handleNext: () => Promise<void>) => {
        form.setValue("gmail-connect", true, { shouldValidate: true });
        await handleNext();
    };

    const handleLogin = () => {
        console.log("Login clicked");
    };

    const handleSkipVendorLibrary = () => {
        console.log("Skip vendor library clicked");
    };

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
                    footerText: (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={handleLogin}
                                className="text-accent hover:underline font-medium"
                            >
                                Login
                            </button>
                        </>
                    ),
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
            customButton: (handleNext, isSubmitting) => (
                <Button
                    className="flex-1"
                    onClick={() => handleGmailConnect(handleNext)}
                    disabled={isSubmitting}
                >
                    <Image src="/images/gmail-icon.png" alt="Gmail" width={20} height={20} className="mr-2" />
                    {isSubmitting ? "Processing..." : "Connect Gmail"}
                </Button>
            ),
        },
        {
            id: "vendor-library",
            title: "Vendor Library",
            status: StepStatus.Pending,
            fieldsToValidate: [],
            footerText: (
                <>
                    Skip for now.{" "}
                    <button
                        type="button"
                        onClick={handleSkipVendorLibrary}
                        className="text-accent hover:underline font-medium"
                    >
                        I&apos;ll create my Vendor Library later.
                    </button>
                </>
            ),
        },
    ];

    return (
        <Wizard
            steps={steps}
            currentStepIndex={0}
            form={form}
            summary={getSummary}
            onComplete={handleComplete}
            renderStepContent={renderStepContent}
        />
    );
}