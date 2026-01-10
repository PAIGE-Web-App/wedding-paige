"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wizard } from "@/components/wizard";
import { WizardStep, StepStatus, WizardSummary } from "@/types/wizard";
import Image from "next/image";
import { SparklesIcon } from "@/components/ui/sparkles-icon";
import { Button } from "@/components/ui/button";
import { BasicInfoStep } from "./basic-info-step";
import { HowYouWorkStep } from "./how-you-work-step";
import { ConnectGmailStep } from "./connect-gmail-step";
import { VendorLibraryStep } from "./vendor-library-step";

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

function renderStepContent(step: WizardStep, form: UseFormReturn<OnboardingFormData>) {
    switch (step.id) {
        case "basic-info":
            return <BasicInfoStep form={form} />;
        case "how-you-work":
            return <HowYouWorkStep form={form} />;
        case "connect-gmail":
            return <ConnectGmailStep form={form} />;
        case "vendor-library":
            return <VendorLibraryStep form={form} />;
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