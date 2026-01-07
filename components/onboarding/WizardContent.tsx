"use client";

import { WizardField, WizardContainerProps } from "@/types/wizard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus, CheckCircle2, Info, AlertCircle, AlertTriangle } from "lucide-react";
import { ReactNode } from "react";

interface WizardContentProps {
  title: string;
  description?: string;
  fields: WizardField[];
  currentStepIndex: number;
  totalSteps: number;
  onCancel: () => void;
  onContinue: () => void;
  onBack?: () => void;
  continueButtonLabel?: string;
  onFieldChange?: (fieldId: string, value: string | number | boolean) => void;
  additionalActions?: WizardContainerProps["additionalActions"];
  banner?: WizardContainerProps["banner"];
  successMessage?: {
    title: string;
    description: string;
    actionLabel?: string;
    onActionClick?: () => void;
  };
  footerActions?: Array<{
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  }>;
}

export function WizardContent({
  title,
  description,
  fields,
  currentStepIndex,
  totalSteps,
  onCancel,
  onContinue,
  onBack,
  continueButtonLabel = "Continue",
  onFieldChange,
  additionalActions,
  banner,
  successMessage,
  footerActions,
}: WizardContentProps) {
  const handleFieldChange = (
    fieldId: string,
    value: string | number | boolean
  ) => {
    onFieldChange?.(fieldId, value);
  };

  const renderField = (field: WizardField) => {
    const baseInputClasses = "w-full";

    switch (field.type) {
      case "email":
      case "text":
      case "password":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <div className="flex gap-2">
              <Input
                id={field.id}
                type={field.type}
                value={field.value?.toString() || ""}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className={cn(baseInputClasses, field.error && "border-destructive")}
                aria-invalid={!!field.error}
              />
            </div>
            {field.helperText && (
              <p className="text-sm text-muted-foreground">{field.helperText}</p>
            )}
            {field.error && (
              <p className="text-sm text-destructive">{field.error}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
              id={field.id}
              value={field.value?.toString() || ""}
              placeholder={field.placeholder}
              required={field.required}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={cn(baseInputClasses, field.error && "border-destructive")}
              aria-invalid={!!field.error}
            />
            {field.helperText && (
              <p className="text-sm text-muted-foreground">{field.helperText}</p>
            )}
            {field.error && (
              <p className="text-sm text-destructive">{field.error}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select
              value={field.value?.toString() || undefined}
              onValueChange={(value) => handleFieldChange(field.id, value)}
              required={field.required}
            >
              <SelectTrigger
                id={field.id}
                className={cn(baseInputClasses, field.error && "border-destructive")}
              >
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.helperText && (
              <p className="text-sm text-muted-foreground">{field.helperText}</p>
            )}
            {field.error && (
              <p className="text-sm text-destructive">{field.error}</p>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={field.value === true}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked === true)}
            />
            <Label htmlFor={field.id} className="cursor-pointer">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.helperText && (
              <p className="text-sm text-muted-foreground">{field.helperText}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getBannerIcon = () => {
    switch (banner?.variant) {
      case "success":
        return <CheckCircle2 className="size-4" />;
      case "warning":
        return <AlertTriangle className="size-4" />;
      case "error":
        return <AlertCircle className="size-4" />;
      default:
        return <Info className="size-4" />;
    }
  };

  const getBannerVariant = () => {
    switch (banner?.variant) {
      case "error":
        return "destructive" as const;
      default:
        return "default" as const;
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-6 py-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{title}</h2>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>

            {banner && (
              <Alert variant={getBannerVariant()} className={cn(
                banner.variant === "success" && "bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
                banner.variant === "warning" && "bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-800 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
              )}>
                {getBannerIcon()}
                <AlertDescription>{banner.message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              {fields.map((field) => (
                <div key={field.id}>
                  {renderField(field)}
                  {field.id === fields[0]?.id && additionalActions && additionalActions.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {additionalActions.map((action, idx) => (
                        <Button
                          key={idx}
                          variant={action.variant || "default"}
                          onClick={action.onClick}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {footerActions && footerActions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {footerActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={action.onClick}
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    {action.icon || <Plus className="size-4" />}
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {successMessage && (
              <Alert className="bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800 [&>svg]:text-green-600 dark:[&>svg]:text-green-400">
                <CheckCircle2 className="size-4" />
                <div className="flex-1">
                  <AlertTitle className="text-green-900 dark:text-green-100">
                    {successMessage.title}
                  </AlertTitle>
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    {successMessage.description}
                  </AlertDescription>
                  {successMessage.actionLabel && successMessage.onActionClick && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={successMessage.onActionClick}
                      className="mt-3 border-green-300 text-green-900 hover:bg-green-100 dark:border-green-700 dark:text-green-100 dark:hover:bg-green-900"
                    >
                      {successMessage.actionLabel}
                    </Button>
                  )}
                </div>
              </Alert>
            )}

            {additionalActions && additionalActions.length > 0 && fields.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {additionalActions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant={action.variant || "outline"}
                    onClick={action.onClick}
                    className="gap-2"
                  >
                    <Plus className="size-4" />
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-background">
        <div className="mx-auto w-full max-w-2xl px-6 py-4">
          <div className="flex items-center gap-4">
            {currentStepIndex === 0 ? (
              <Button className="w-full" onClick={onContinue}>{continueButtonLabel}</Button>
            ) : (
              <>
                <Button variant="outline" className="w-1/2" onClick={onBack}>
                  Back
                </Button>
                <Button className="w-1/2" onClick={onContinue}>{continueButtonLabel}</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

