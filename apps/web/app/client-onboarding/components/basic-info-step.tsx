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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CirclePlus, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { ClientOnboardingFormData } from "../page";

export function BasicInfoStep({ form }: { form: UseFormReturn<ClientOnboardingFormData> }) {
    const { control, watch, setValue } = form;
    const { fields, append } = useFieldArray({
        control,
        name: "emails" as any,
    });
    const dateUndecided = watch("date-undecided");

    const handleAddEmail = () => {
        append("");
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Basic Information</h2>
                <p className="text-muted-foreground">
                    Enter the couple&apos;s basic information email address(es) and click &apos;Verify&apos;. Paige will try to find their basic details if they exist in your Gmail messages.
                </p>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-foreground">
                    Verifying allows Paige to look for existing conversations to personalize setup.
                </AlertDescription>
            </Alert>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <FormField
                                control={control}
                                name="first-name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            First Name <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter first name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <FormField
                                control={control}
                                name="last-name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Last Name <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center py-2">
                        <h1 className="text-4xl font-light text-muted-foreground text-center">&</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <FormField
                                control={control}
                                name="partner-first-name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Partner&apos;s First Name <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter first name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <FormField
                                control={control}
                                name="partner-last-name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Partner&apos;s Last Name <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <FormField
                        control={control}
                        name="wedding-date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    When&apos;s the big day? <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                disabled={dateUndecided}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? (
                                                    format(new Date(field.value), "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? parse(field.value, "yyyy-MM-dd", new Date()) : undefined}
                                                onSelect={(date) => {
                                                    field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                                                }}
                                                autoFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="date-undecided"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                            field.onChange(checked);
                                            if (checked) {
                                                setValue("wedding-date", "", { shouldValidate: true });
                                            }
                                        }}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="font-normal cursor-pointer">
                                        They haven&apos;t decided yet
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <FormField
                            key={field.id}
                            control={control}
                            name={`emails.${index}`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {index === 0 && (
                                            <>
                                                Email Address <span className="text-destructive">*</span>
                                            </>
                                        )}
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleAddEmail}
                        className="justify-start text-accent hover:text-accent hover:bg-accent/10"
                    >
                        <CirclePlus className="h-4 w-4 mr-2" />
                        Add Email Address
                    </Button>
                </div>
            </div>
        </div>
    );
}
