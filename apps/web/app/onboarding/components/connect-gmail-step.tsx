"use client";

import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { SparklesIcon } from "@/components/ui/sparkles-icon";
import Image from "next/image";
import { OnboardingFormData } from "@/types/onboarding";

export function ConnectGmailStep({ form }: { form: UseFormReturn<OnboardingFormData> }) {
    const { control } = form;

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
                        <Alert variant="info" className="space-y-4 ">
                            <AlertTitle className="flex items-center gap-2 font-serif">
                                <SparklesIcon />
                                How does this work?
                            </AlertTitle>
                            <AlertDescription className="space-y-4">
                                <div className="space-y-1">
                                    <p className="font-semibold">Paige drafts. You stay in control.</p>
                                    <p className="text-sm">Paige reads relevant emails and suggests replies, tasks, and updates - but nothing is sent or applied without your approval.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-semibold">Send emails directly from Paige</p>
                                    <p className="text-sm">Draft and send emails to vendors inside Paige using your Gmail account. Messages are sent from your email address, just like Gmail.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-semibold">You control what Paige can see</p>
                                    <p className="text-sm">Choose which conversations Paige can access. You can exclude personal or unrelated emails anytime.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-semibold">Disconnect anytime</p>
                                    <p className="text-sm">You can pause or disconnect Gmail access whenever you want — no lock-in.</p>
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
                            </AlertDescription>
                        </Alert>
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
}
