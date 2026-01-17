"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wizard } from "@/components/wizard";
import { WizardStep, StepStatus, WizardSummary } from "@/types/wizard";
import Image from "next/image";
import { SparklesIcon } from "@/components/ui/sparkles-icon";
import { BasicInfoStep } from "./components/basic-info-step";
import { VendorsStep } from "./components/vendors-step";

const vendorSchema = z.object({
    name: z.string().min(1, "Vendor name is required"),
    email: z.email("Please enter a valid email address").min(1, "Vendor email is required"),
    category: z.string().optional(),
});

export const clientOnboardingSchema = z.object({
    "first-name": z.string().min(1, "First name is required"),
    "last-name": z.string().min(1, "Last name is required"),
    "partner-first-name": z.string().min(1, "Partner's first name is required"),
    "partner-last-name": z.string().min(1, "Partner's last name is required"),
    "wedding-date": z.string().optional(),
    "date-undecided": z.boolean(),
    emails: z.array(z.string()).superRefine((emails, ctx) => {
        const validEmails = emails.filter((e) => e.length > 0);
        validEmails.forEach((email) => {
            const result = z.email().safeParse(email);
            if (!result.success) {
                ctx.addIssue({
                    code: "custom",
                    message: "Please enter a valid email address",
                    path: [emails.indexOf(email)],
                });
            }
        });
    }),
    vendors: z.array(vendorSchema),
}).refine((data) => data["wedding-date"] || data["date-undecided"], {
    message: "Please enter a wedding date or select 'They haven't decided yet'",
    path: ["wedding-date"],
});

export type ClientOnboardingFormData = z.infer<typeof clientOnboardingSchema>;

function getSummary(data: ClientOnboardingFormData): WizardSummary {
    const sections: WizardSummary["sections"] = [];

    const coupleName = `${data["first-name"]} ${data["last-name"]} & ${data["partner-first-name"]} ${data["partner-last-name"]}`;

    sections.push({
        title: "Basic Information",
        items: [
            coupleName,
            data["wedding-date"] ? `Wedding Date: ${data["wedding-date"]}` : "Wedding Date: TBD",
            ...data.emails.filter((email) => email.length > 0).map((email) => `Email: ${email}`),
        ],
    });

    const selectedVendors = data.vendors?.filter((v) => v.name && v.email) || [];
    if (selectedVendors.length > 0) {
        sections.push({
            title: "Vendors",
            items: selectedVendors.map((vendor) =>
                vendor.category
                    ? `${vendor.name} · ${vendor.email} · ${vendor.category}`
                    : `${vendor.name} · ${vendor.email}`
            ),
        });
    }

    return {
        title: "Client Onboarding Complete",
        icon: <SparklesIcon size={10} />,
        description: "Here's a summary of the client information.",
        sections,
        illustration: (
            <div className="flex items-center justify-center pt-8">
                <Image src="/images/m+p.png" alt="M + P" width={200} height={200} />
            </div>
        ),
    };
}

function renderStepContent(step: WizardStep, form: UseFormReturn<ClientOnboardingFormData>) {
    switch (step.id) {
        case "basic-information":
            return <BasicInfoStep form={form} />;
        case "vendors":
            return <VendorsStep form={form} />;
        default:
            return null;
    }
}

export default function ClientOnboardingPage() {
    const form = useForm<ClientOnboardingFormData>({
        resolver: zodResolver(clientOnboardingSchema),
        defaultValues: {
            "first-name": "",
            "last-name": "",
            "partner-first-name": "",
            "partner-last-name": "",
            "wedding-date": "",
            "date-undecided": false,
            emails: [""],
            vendors: [
                {
                    name: "The Barn at Willow Creek",
                    email: "info@barnwillowcreek.com",
                    category: "",
                },
            ],
        },
        mode: "onBlur",
    });

    const handleComplete = async (data: ClientOnboardingFormData) => {
        console.log("Client onboarding complete!", data);
    };

    const steps: WizardStep[] = [
        {
            id: "basic-information",
            title: "Basic Information",
            status: StepStatus.Active,
            fieldsToValidate: ["first-name", "last-name", "partner-first-name", "partner-last-name", "wedding-date", "emails"],
        },
        {
            id: "vendors",
            title: "Vendors",
            status: StepStatus.Pending,
            fieldsToValidate: [],
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
