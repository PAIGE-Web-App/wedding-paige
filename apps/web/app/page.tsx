"use client";

import { useForm } from "react-hook-form";
import { Wizard } from "@/components/wizard";
import { WizardStep, WizardSummary } from "@/types/wizard";
import Image from "next/image";

export default function Home() {
  const form = useForm();

  const steps: WizardStep[] = [];

  const summary = (): WizardSummary => ({
    title: "",
    sections: [],
    illustration: <div className="flex items-center justify-center pt-8">
      <Image src="/images/m+p.png" alt="M + P" width={200} height={200} />
    </div>
  });

  const onComplete = async () => { };

  const renderStepContent = () => null;

  return (
    <Wizard
      steps={steps}
      currentStepIndex={0}
      form={form}
      summary={summary}
      onComplete={onComplete}
      renderStepContent={renderStepContent}
    />
  );
}
