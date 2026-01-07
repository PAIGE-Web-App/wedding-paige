"use client";

import Image from "next/image";
import { WizardContainer } from "@/components/onboarding";
import {
    WizardGroup,
    WizardField,
    WizardSummary,
    WizardStepConfig,
    StepStatus,
} from "@/types/wizard";
import { Sparkles } from "lucide-react";

const initialGroups: WizardGroup[] = [
    {
        id: "profile-setup",
        title: "Profile Setup",
        subSteps: [
            {
                id: "basic-info",
                title: "Basic Info",
                status: StepStatus.Active,
            },
            {
                id: "how-you-work",
                title: "How you work",
                status: StepStatus.Pending,
            },
        ],
    },
    {
        id: "connect-gmail",
        title: "Connect Gmail",
        subSteps: [],
        status: StepStatus.Pending,
    },
    {
        id: "vendor-library",
        title: "Vendor Library",
        subSteps: [],
        status: StepStatus.Pending,
    },
];

const STEP_CONFIG: Record<string, { fields: WizardField[]; description?: string; continueButton?: { label: string; onClick: () => void | Promise<void> } }> = {
    "basic-info": {
        fields: [
            {
                id: "your-name",
                type: "text",
                label: "Your Name",
                placeholder: "Enter your full name",
                required: true,
            },
            {
                id: "business-name",
                type: "text",
                label: "Your Business Name",
                placeholder: "Enter business name",
            },
        ],
        description: "You can edit this anytime in Settings.",
    },
    "how-you-work": {
        fields: [
            {
                id: "work-style",
                type: "select",
                label: "How do you work?",
                options: [
                    { label: "Solo", value: "solo" },
                    { label: "Team", value: "team" },
                    { label: "Agency", value: "agency" },
                ],
                required: true,
            },
        ],
        description: "Tell us about your work style.",
    },
    "connect-gmail": {
        fields: [
            {
                id: "gmail-connect",
                type: "checkbox",
                label: "Connect Gmail account",
                required: true,
            },
        ],
        description: "Connect your Gmail to get started.",
        continueButton: {
            label: "Connect Gmail",
            onClick: async () => {
                // Custom Gmail connection logic here
                console.log("Connecting to Gmail...");
                // Example: await connectGmail();
            },
        },
    },
    "vendor-library": {
        fields: [
            {
                id: "vendor-selection",
                type: "select",
                label: "Select Vendor",
                options: [
                    { label: "Photographer", value: "photographer" },
                    { label: "Caterer", value: "caterer" },
                    { label: "Florist", value: "florist" },
                ],
                required: true,
            },
        ],
        description: "Select vendors from your library.",
    },
};

export default function OnboardingPage() {
    const handleCancel = () => {
        if (confirm("Are you sure you want to cancel? Your progress will be lost.")) {
            window.location.href = "/";
        }
    };

    const handleFieldChange = (fieldId: string, value: string | number | boolean) => {
        // Handle field changes if needed
    };

    const handleStepChange = (stepIndex: number) => {
        // Handle step changes if needed
    };

    const handleComplete = () => {
        console.log("Onboarding complete!");
    };

    const getStepConfig = (stepId: string): WizardStepConfig | null => {
        return STEP_CONFIG[stepId] || null;
    };

    const summary: WizardSummary = {
        title: "Planning made easy.",
        icon: <Sparkles className="size-5" />,
        sections: [
            {
                items: [
                    {
                        label: "Here's how Paige will configure your personalized workspace.",
                        value: "",
                    },
                ],
            },
        ],
        illustration: (
            <div className="flex items-center justify-center pt-8">
                <Image src="/images/m+p.png" alt="M + P" width={200} height={200} />
            </div>
        ),
    };

    return (
        <WizardContainer
            groups={initialGroups}
            getStepConfig={getStepConfig}
            summary={summary}
            onCancel={handleCancel}
            onFieldChange={handleFieldChange}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
        />
    );
}

