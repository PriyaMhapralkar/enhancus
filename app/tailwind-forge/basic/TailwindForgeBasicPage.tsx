"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaintBucket, RotateCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ColorPickerCard from "@/components/tailwindforge/ColorPickerCard";
import PreviewCard from "@/components/tailwindforge/PreviewCard";
import ExportCard from "@/components/tailwindforge/ExportCard";
import ThemeToggle from "@/components/tailwindforge/ThemeToggle";
import { FAQCard } from "@/components/FAQCard";
import { HeaderCard } from "@/components/HeaderCard";
import Link from "next/link";
import { tailwindForgeFAQs } from "@/data/tailwindForgeFAQ";
import { useColorStore } from "@/components/tailwindforge/store";
import Counter from "@/components/analytics/Counter";

export default function TailwindForgeBasicPage() {
  const { loadConfig, resetColors, randomizeColors } = useColorStore();

  useEffect(() => {
    loadConfig(true);
  }, [loadConfig]);

  return (
    <div className="container mx-auto px-4 py-16">
      <Counter page="tailwindforge-basic" className="text-right px-10 py-2" />
      <HeaderCard
        title="TailwindForge Basic"
        icon={PaintBucket}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          {label: "TailwindForge", href: "/tailwind-forge"},
          { label: "Basic", href: "/tailwind-forge/basic" },
        ]}
      />
      <div className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <PreviewCard />
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <ColorPickerCard isBasic={true} />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            {/* Theme Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Theme Settings (Basic)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Mode Toggle */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Toggle Theme
                  </p>
                  <div className="cursor-pointer">
                    <ThemeToggle />
                  </div>
                </div>

                {/* Go to Advanced Mode Button */}
                <div>
                  <Link href="/tailwind-forge/advanced">
                    <Button variant="default" className="w-full cursor-pointer">
                      <span className="mr-2">🛠</span> Go to Advanced Mode
                    </Button>
                  </Link>
                </div>

                {/* Go to Migration Mode Button */}
                <div>
                  <Link href="/tailwind-forge/migration">
                    <Button variant="default" className="w-full cursor-pointer">
                      <span className="mr-2">🛠</span> Go to Migration Mode
                    </Button>
                  </Link>
                </div>

                {/* Action Buttons: Reset + Random */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant="secondary"
                    className="w-full cursor-pointer"
                    onClick={() => resetColors(true)}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Colors
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={() => randomizeColors(true)}
                  >
                    <Shuffle className="mr-2 h-4 w-4" />
                    Random Colors
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Export Section */}
            <ExportCard />

            {/* FAQ */}
            {/* FAQ Section */}
<FAQCard
  title="Basic Mode FAQs"
  faqs={tailwindForgeFAQs.filter((faq) => faq.id.startsWith("basic"))}
/>

          </div>
        </div>
      </div>
    </div>
  );
}
