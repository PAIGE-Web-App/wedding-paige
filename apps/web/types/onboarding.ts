import { z } from "zod";
import { onboardingSchema } from "@/app/onboarding/page";

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
