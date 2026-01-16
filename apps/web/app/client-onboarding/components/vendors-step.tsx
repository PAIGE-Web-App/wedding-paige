"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash, CirclePlus } from "lucide-react";
import { ClientOnboardingFormData } from "../page";

export function VendorsStep({ form }: { form: UseFormReturn<ClientOnboardingFormData> }) {
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
                <h2 className="text-2xl font-semibold">Vendors</h2>
                <p className="text-muted-foreground">
                    Add vendors for this couple&apos;s wedding. You can always add more vendors later.
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
