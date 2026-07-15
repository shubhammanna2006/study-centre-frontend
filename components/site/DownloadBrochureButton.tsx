"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

export function DownloadBrochureButton() {
  return (
    <Button variant="outline" className="w-full" onClick={() => toast.success("Brochure download queued (mock)")}>
      <Download className="mr-2 h-4 w-4" /> Download Brochure
    </Button>
  );
}
