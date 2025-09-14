"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaintBucket, Copy, Download, RefreshCw } from "lucide-react";
import { HeaderCard } from "@/components/HeaderCard";
import { FAQCard } from "@/components/FAQCard";
import { tailwindForgeFAQs } from "@/data/tailwindForgeFAQ";
import { generateFromNestedColors } from "@/utils/tailwindUtils";
import Link from "next/link";
import Counter from "@/components/analytics/Counter";

export default function TailwindMigrationPage() {
  const [inputConfig, setInputConfig] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    const converted = generateFromNestedColors(inputConfig);
    setOutput(converted);
    setCopied(false);
  };

  const loadSampleConfig = () => {
    setInputConfig(`theme: {
  colors: {
    background: "#ffffff",
    foreground: "#111827",
    primary: {
      DEFAULT: "#3b82f6",
      foreground: "#ffffff",
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe"
    },
    secondary: {
      DEFAULT: "#6b7280",
      foreground: "#ffffff",
      50: "#f9fafb",
      100: "#f3f4f6"
    }
  }
}`);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: "text/css" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tailwind-v4-theme.css";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleResetOutput = () => {
    setOutput("");
    setInputConfig("");
    setCopied(false);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Analytics Counter */}
      <Counter page="tailwindforge-migration" className="text-right px-10 py-2" />

      {/* Header */}
      <HeaderCard
        title="TailwindForge Migration"
        icon={PaintBucket}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "TailwindForge", href: "/tailwind-forge" },
          { label: "Migration", href: "/tailwind-forge/migration" },
        ]}
      />

      <div className="mt-6 space-y-6">
        {/* Mode Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Mode Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/tailwind-forge/basic">
                <Button variant="default" className="w-full cursor-pointer">
                  <span className="mr-2">🛠</span> Go to Basic Mode
                </Button>
              </Link>
              <Link href="/tailwind-forge/advanced">
                <Button variant="default" className="w-full cursor-pointer">
                  <span className="mr-2">🛠</span> Go to Advanced Mode
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Migration Tool */}
        <Card>
          <CardHeader>
            <CardTitle>Tailwind v3 ➝ v4 Migration Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Paste your Tailwind v3 config and convert colors to Tailwind v4
              <code className="px-1 py-0.5 bg-muted rounded text-xs">@theme</code> inline CSS.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleConvert} className="cursor-pointer">
                Convert
              </Button>
              <Button variant="ghost" onClick={loadSampleConfig} className="cursor-pointer">
                Load Sample
              </Button>
              <Button
                variant={copied ? "default" : "outline"}
                className="cursor-pointer"
                onClick={handleCopy}
                disabled={!output}
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "Copied!" : "Copy CSS"}
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handleDownload}
                disabled={!output}
              >
                <Download className="mr-2 h-4 w-4" />
                Download CSS
              </Button>
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={handleResetOutput}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            {/* Input / Output Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h3 className="text-md font-semibold mb-2">Input Config</h3>
                <Textarea
                  spellCheck={false}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Paste tailwind.config.js content here..."
                  value={inputConfig}
                  onChange={(e) => setInputConfig(e.target.value)}
                />
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Tailwind v4 Theme Output</h3>
                <Textarea
                  className="min-h-[400px] font-mono text-sm"
                  value={output}
                  readOnly
                  placeholder="Converted CSS will appear here..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <FAQCard
          title="Migration Mode FAQs"
          faqs={tailwindForgeFAQs.filter((faq) => faq.id.startsWith("migration"))}
        />
      </div>
    </div>
  );
}
