import { jsPDF } from "jspdf";
import { formatDate } from "./scheduleCalc";

export function exportSchedulePDF(schedule, moodLabel, zoneLabel, sowDateString) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("The Hanging Bouquet", margin, y);
  y += 28;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Mood: ${moodLabel}   ·   Zone: ${zoneLabel}   ·   Sow Date: ${sowDateString}`, margin, y);
  y += 30;

  doc.setDrawColor(180, 180, 180);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  const colWidths = [160, 90, 90, 90, 85];
  const headers = ["Flower", "Sow Date", "Weeks to Bloom", "Bloom Date", "Indoor Start?"];

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  let x = margin;
  headers.forEach((h, i) => {
    doc.text(h, x, y);
    x += colWidths[i];
  });
  y += 6;
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  schedule.forEach(({ flower, actualSowDate, bloomDate, indoorStart }) => {
    x = margin;
    const row = [
      flower.name,
      formatDate(actualSowDate),
      `${flower.weeksToBloom} weeks`,
      formatDate(bloomDate),
      indoorStart ? "Yes" : "No",
    ];
    row.forEach((val, i) => {
      doc.text(val, x, y);
      x += colWidths[i];
    });
    y += 18;

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`  ☀ ${flower.sunlight}   💧 ${flower.watering}`, margin + 8, y);
    y += 12;
    if (indoorStart) {
      doc.text(`  🌱 ${flower.indoorNotes}`, margin + 8, y);
      y += 12;
    }
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    y += 4;

    if (y > 700) {
      doc.addPage();
      y = margin;
    }
  });

  y += 10;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Congratulations — you've made your bouquet.", margin, y);

  doc.save("hanging-bouquet-schedule.pdf");
}
