"use client";

import { Button } from "@/components/ui/button";
import type { AdmitCardData } from "./AdmitCard";

interface Props {
  data: AdmitCardData;
}

export default function DownloadAdmitCard({ data }: Props) {
  const generatePDF = async () => {
    const element = document.getElementById("admit-card");

    if (!element) {
      return;
    }

    const html2pdf = (await import("html2pdf.js")).default;

    const options = {
      margin: 0,

      filename: `admit-card-${data.admitCardNumber}.pdf`,

      image: {
        type: "jpeg" as const,
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      },

      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },

      pagebreak: {
        mode: ["css", "legacy"] as const,
      },
    };

    await html2pdf().set(options).from(element).save();

    await html2pdf().set(options).from(element).save();
  };

  return <Button onClick={generatePDF}>Download Admit Card</Button>;
}
