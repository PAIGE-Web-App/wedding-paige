"use client";

import { useState, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckmarkIcon } from "@/components/ui/checkmark-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CirclePlus, X, Info, Search, Trash2, Store } from "lucide-react";
import { ClientOnboardingFormData } from "../page";
import { cn } from "@/lib/utils";

interface VendorLibraryItem {
    id: string;
    name: string;
    email: string;
    relatedEmails: number;
    confidence: "High" | "Medium" | "Low";
    statusIndicators: number;
}

const mockVendorLibrary: VendorLibraryItem[] = [
    {
        id: "1",
        name: "The Barn at Willow Creek",
        email: "info@barnwillowcreek.com",
        relatedEmails: 2,
        confidence: "High",
        statusIndicators: 2,
    },
];

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function VendorsStep({ form }: { form: UseFormReturn<ClientOnboardingFormData> }) {
    const { watch, setValue } = form;
    const [searchQuery, setSearchQuery] = useState("");
    const [showAlert, setShowAlert] = useState(true);
    const [selectedLibraryVendors, setSelectedLibraryVendors] = useState<Set<string>>(new Set(["1"]));
    const [showAddVendorForm, setShowAddVendorForm] = useState(false);
    const [newVendor, setNewVendor] = useState({ name: "", email: "", category: "" });
    const vendorFormRef = useRef<HTMLDivElement>(null);

    const vendors = watch("vendors") || [];
    const selectedVendors = vendors.filter((v) => v.name && v.email);

    const handleToggleLibraryVendor = (vendorId: string) => {
        const vendor = mockVendorLibrary.find((v) => v.id === vendorId);
        if (!vendor) return;

        const newSelected = new Set(selectedLibraryVendors);
        if (newSelected.has(vendorId)) {
            newSelected.delete(vendorId);
            setValue(
                "vendors",
                vendors.filter((v) => v.name !== vendor.name)
            );
        } else {
            newSelected.add(vendorId);
            const existingIndex = vendors.findIndex((v) => v.name === vendor.name);
            if (existingIndex === -1) {
                setValue("vendors", [...vendors, { name: vendor.name, email: vendor.email, category: "" }]);
            }
        }
        setSelectedLibraryVendors(newSelected);
    };

    const handleRemoveSelectedVendor = (vendorName: string) => {
        setValue(
            "vendors",
            vendors.filter((v) => v.name !== vendorName)
        );
        const vendor = mockVendorLibrary.find((v) => v.name === vendorName);
        if (vendor) {
            const newSelected = new Set(selectedLibraryVendors);
            newSelected.delete(vendor.id);
            setSelectedLibraryVendors(newSelected);
        }
    };

    const filteredLibrary = mockVendorLibrary.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddVendorClick = () => {
        setShowAddVendorForm(true);
        setTimeout(() => {
            vendorFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    const handleAddVendor = () => {
        if (newVendor.name && newVendor.email) {
            setValue("vendors", [...vendors, { ...newVendor }]);
            setNewVendor({ name: "", email: "", category: "" });
            setShowAddVendorForm(false);
        }
    };

    const handleRemoveNewVendor = () => {
        setNewVendor({ name: "", email: "", category: "" });
        setShowAddVendorForm(false);
    };

    const handleVerifyEmail = () => {
        console.log("Verifying email:", newVendor.email);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h2 className="text-3xl font-medium">Vendors</h2>
                <div className="space-y-3 text-muted-foreground text-sm">
                    <p>
                        If you&apos;ve already emailed vendors about this wedding, add them here and Paige will pull in relevant messages to suggest updates to the plan.
                    </p>
                    <p>
                        If not, you can still add vendors now so future emails are automatically organized and tracked.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>How does Paige handle vendors used for multiple Vendors?</span>
                    <Info className="h-4 w-4" />
                </div>
            </div>

            {showAlert && (
                <Alert className="border-blue-200 bg-blue-50 rounded-lg">
                    <AlertDescription className="flex items-center justify-between text-foreground">
                        <span>Paige was able to fill in some information from your emails about the couple</span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAlert(false)}
                        >
                            Dismiss
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            <Card className="border rounded-md bg-muted/30 p-0">
                <CardHeader className="flex items-center justify-between bg-white p-4 !pb-4 rounded-t-lg border-b">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium uppercase tracking-wide">SELECTED VENDORS</h3>
                        {selectedVendors.length > 0 && (
                            <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                                {selectedVendors.length}
                            </Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="pb-4 px-4">
                    {selectedVendors.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {selectedVendors.map((vendor) => (
                                <div
                                    key={vendor.name}
                                    className="flex items-center gap-2 p-3 bg-white border rounded-sm"
                                >
                                    <CheckmarkIcon />
                                    <span className="text-sm font-medium">{vendor.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSelectedVendor(vendor.name)}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No vendors selected</p>
                    )}
                </CardContent>
            </Card>

            <Card className="border rounded-md bg-muted/30 p-0">
                <CardHeader className="flex items-center justify-between bg-white p-4 !pb-4 rounded-t-lg border-b">
                    <p className="text-sm font-medium uppercase">ADD FROM VENDOR LIBRARY</p>
                    <div className="relative w-64 ">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search vendor library"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </CardHeader>

                <ScrollArea className="h-[400px]">
                    <div className="space-y-2 px-4">
                        {filteredLibrary.map((vendor) => {
                            const isSelected = selectedLibraryVendors.has(vendor.id);
                            return (
                                <div
                                    key={vendor.id}
                                    className={cn(
                                        "flex items-center gap-4 p-4 rounded-lg border-2 transition-colors",
                                        isSelected
                                            ? "border-accent bg-white"
                                            : "border-transparent hover:border-border bg-background"
                                    )}
                                >
                                    <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={() => handleToggleLibraryVendor(vendor.id)}
                                    />
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-900 font-medium text-sm shrink-0">
                                        {getInitials(vendor.name)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm">{vendor.name}</div>
                                        <div className="text-xs text-muted-foreground mt-0.5">
                                            Found {vendor.relatedEmails} related emails
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="mt-1.5 bg-green-100 text-green-800 border-green-200 text-xs"
                                        >
                                            {vendor.confidence} confidence
                                        </Badge>
                                    </div>
                                    {isSelected && (
                                        <Badge className="bg-accent text-white border-accent text-xs">
                                            Selected
                                        </Badge>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </Card>

            {!showAddVendorForm && (
                <div className="flex justify-center">
                    <Button
                        type="button"
                        variant="outline"
                        className="border-dashed w-full"
                        onClick={handleAddVendorClick}
                    >
                        <CirclePlus className="h-4 w-4 mr-2" />
                        Add a Vendor not in your Library
                    </Button>
                </div>
            )}

            {showAddVendorForm && (
                <div ref={vendorFormRef} className="pt-4">
                    <Card className="border rounded-lg bg-white p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-900 shrink-0">
                                    <Store className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-medium">Vendor {vendors.length + 1}</h3>
                            </div>
                            <button
                                type="button"
                                onClick={handleRemoveNewVendor}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="vendor-name">
                                    Vendor Name<span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="vendor-name"
                                    placeholder="Enter Vendor Name"
                                    value={newVendor.name}
                                    onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="vendor-email">
                                    Vendor Email<span className="text-destructive">*</span>
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="vendor-email"
                                        type="email"
                                        placeholder="Enter Vendor Email"
                                        value={newVendor.email}
                                        onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleVerifyEmail}
                                        className="shrink-0"
                                    >
                                        Verify
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="vendor-category">Category</Label>
                                <Select
                                    value={newVendor.category}
                                    onValueChange={(value) => setNewVendor({ ...newVendor, category: value })}
                                >
                                    <SelectTrigger id="vendor-category" className="w-full">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="venue">Venue</SelectItem>
                                        <SelectItem value="catering">Catering</SelectItem>
                                        <SelectItem value="photography">Photography</SelectItem>
                                        <SelectItem value="florist">Florist</SelectItem>
                                        <SelectItem value="music">Music</SelectItem>
                                        <SelectItem value="planner">Planner</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                type="button"
                                onClick={handleAddVendor}
                                className="w-full"
                                disabled={!newVendor.name || !newVendor.email}
                            >
                                Add Vendor
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
