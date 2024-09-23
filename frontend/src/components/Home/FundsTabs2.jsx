import React, { useState, useRef  } from "react";
import { Tab, Tabs, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FundCards from "./UniversityCard";
import SectionTitle from "./SectionTitle";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function FundsTabs({ universities }) {
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const docRef = useRef(null);

  const selectedUniversity = universities[0];

  const logoRight = `${process.env.PUBLIC_URL}/VidyarthiMitra.org Logo4.png`; 
  const newLogo = `${process.env.PUBLIC_URL}/VidyarthiMitra.org Logo4.png`; // Update with your new logo path

  const handleGeneratePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    docRef.current = doc;
    const pageWidth = doc.internal.pageSize.getWidth();
    
    const addHeader = () => {
      doc.addImage(logoRight, 'PNG', pageWidth - 140, 10, 130, 50); 
    };
  
    const addFirstPageContent = () => {
      doc.setFontSize(16);
      const title = 'India’s Leading Educational Web Portal & App';
      const centerX = pageWidth / 2;
    
      // Set color to black for the entire title
      doc.setTextColor(0, 0, 0); 
      doc.text('India’s Leading ', centerX - 169, 70); // Adjust position as needed
      // Change color for "Educational"
      doc.setTextColor(255, 0, 0);
      doc.text('Educational', centerX - 55, 70); // Adjust position as needed
      // Reset color to black for the rest of the title
      doc.setTextColor(0, 0, 0);
      doc.text('        Web Portal & App', centerX ,70); // Adjust position as needed
    
      doc.addImage(newLogo, 'PNG', centerX - 145, 75, 300, 85);
    
      doc.setFontSize(14);
      
      const subtitle1 = 'Counselling | Admissions | KG to PG | Aptitude Tests';
      const subtitle2 = 'Mock Exams | Jobs | Skills | India | Abroad';
      const subtitleY = 170;
    
      doc.setTextColor(0, 0, 0); // Black
      doc.setFont(undefined, 'normal');
      doc.text(subtitle1, centerX - doc.getTextWidth(subtitle1, { size: 14 }) / 2, subtitleY);
    
      // Set font and color for "Mock Exams"
      doc.setTextColor(255, 0, 0); // Red
      doc.setFont(undefined, 'normal');
      doc.text('Mock Exams', centerX - doc.getTextWidth(subtitle2, { size: 14 }) / 2, subtitleY + 15);
    
      // Set font and color for the rest of subtitle2
      doc.setTextColor(0, 0, 0); // Black
      doc.setFont(undefined, 'normal');
      doc.text(' | Jobs | Skills | India | ', centerX - doc.getTextWidth(subtitle2, { size: 14 }) / 2 + doc.getTextWidth('Mock Exams', { size: 14 }), subtitleY + 15);
    
      // Set font and color for "Abroad"
      doc.setTextColor(255, 0, 0); // Red
      doc.setFont(undefined, 'normal');
      doc.text('Abroad', centerX + 87, subtitleY + 15); // Adjust the position if needed
      
      doc.setTextColor(0, 0, 0);
      doc.text('Web: www.vidyarthimitra.org | Ph. +91 77200 25900;', centerX - doc.getTextWidth('Web: www.vidyarthimitra.org | Ph. +91 77200 25900;', { size: 12 }) / 2, subtitleY + 30);
      
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(40, subtitleY + 55, pageWidth - 40, subtitleY + 55);
      
      const lineHeight = 20; 
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'bold');
      doc.text(`Student Name: Rakhi`, 40, subtitleY + 75);
      doc.text(`Course Preferences: ${selectedUniversity['Branch Name']}`, 40, subtitleY + 75 + lineHeight);
      doc.text(`City Preference: ${selectedUniversity['District']}`, 40, subtitleY + 75 + lineHeight * 2);
      doc.text(`MHT-CET Score: ${selectedUniversity['percentile']}`, 40, subtitleY + 75 + lineHeight * 3);
      doc.setFont(undefined, 'normal');
      
      const preferencesTitle = `${selectedUniversity['District']} College Preferences List`;
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(preferencesTitle, centerX - doc.getTextWidth(preferencesTitle, { size: 14 }) / 2, subtitleY + 75 + lineHeight * 4);
      doc.setFont(undefined, 'normal');

      const textWidth = doc.getTextWidth(preferencesTitle);
      const underlineY = subtitleY + 75 + lineHeight * 4 + 5; // Adjust for underline position
      doc.setDrawColor(0); // Set line color
      doc.setLineWidth(1.5); // Set line width
      doc.line(centerX - textWidth / 1.9, underlineY, centerX + textWidth / 1.9, underlineY); 
    };
  
    // Add content
    addHeader();
    addFirstPageContent();
  
    const startY = doc.lastAutoTable.finalY + 20; 
  
    // Check if universities have data
    if (universities.length === 0) {
      doc.text("No university data available.", 40, startY);
    } else {
      const columns = [
        { header: 'Sr.No', dataKey: 'srNo' },
        { header: 'College Code', dataKey: 'collegeCode' },
        { header: 'College Name', dataKey: 'collegeName' },
        { header: 'Address', dataKey: 'address' },
        { header: 'Status', dataKey: 'status' },
        { header: 'District', dataKey: 'district' }
      ];
  
      const rows = universities.map((college, index) => ({
        srNo: index + 1,
        collegeCode: college['college code'], 
        collegeName: college['College Name'],
        address: college['Address'], 
        status: college['Institute Status'], 
        district: college['District'] 
      }));
  
      doc.autoTable({
        startY: 335,
        head: [columns.map(col => col.header)],
        body: rows.map(row => columns.map(col => row[col.dataKey])),
        margin: { top: 70 },
        didDrawPage: (data) => {
          addHeader(); 
          const currentPageY = doc.internal.getCurrentPageInfo().pageHeight;

          if (currentPageY - data.cursor.y < 100) {
            doc.addPage();
          }
      
          if (doc.lastAutoTable) {
            const tableWidth = doc.lastAutoTable.previous.width; 
            const startX = data.table.startX; 
            const startY = data.cursor.y;
            const tableHeight = doc.lastAutoTable.finalY - startY + data.table.height;
      
            if (tableWidth > 0 && tableHeight > 0) {
              doc.setDrawColor(0); 
              doc.setLineWidth(0.5); 
              
              doc.rect(startX, startY - data.table.height, tableWidth, tableHeight);
            }
          }
          const pageNumber = doc.internal.getNumberOfPages(); // Get the total number of pages
          const text = `Page ${data.pageCount} of ${pageNumber}`; // Page number text
          const textWidth = doc.getTextWidth(text);
          const pageWidth = doc.internal.pageSize.getWidth();
      
          // Set position for the page number
          const x = pageWidth - textWidth - 10; // Right-aligned with a margin
          const y = currentPageY - 10; // 10 units from bottom
      
          if (!isNaN(x) && !isNaN(y)) {
            doc.setFontSize(12);
            doc.text(text, x, y); // Add page number text
          }
        },
        didDrawCell: (data) => {
          const { width, height } = data.cell;
          if (data.cell) {
            doc.setDrawColor(0);
            doc.setLineWidth(0.5); 
            doc.rect(data.cell.x, data.cell.y, width, height);
          }
        }
      });                 
    }

    const footerText = 'Note: The above list is not an allotment or admission list. It is just predictions based on score, category, previous year trending cut-offs, Institute or College status, all ranks and many other parameters.';
    const maxWidth = pageWidth - 80;
    const footerLines = doc.splitTextToSize(footerText, maxWidth);
    const footerY = doc.internal.pageSize.height - 60; 

    footerLines.forEach((line, index) => {
      doc.text(line, 40, footerY + (index * 15))
    });

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfPreviewUrl(pdfUrl);
  };  

  const handleDownloadPDF = () => {
    if (docRef.current) {
      docRef.current.save('Filtered_Colleges_List.pdf'); // Download the saved PDF
    }
  };

  return (
    <div>
      <Tabs className="sm:mt-0 mt-14">
        <div className="my-8 flex flex-col items-center">
          <SectionTitle
            title="Most Popular Colleges"
            classes="text-center text-2xl font-bold sm:text-3xl"
          />
          <div className="w-full flex justify-end sm:justify-center sm:pr-0 pr-4 mt-4">
            <button
              className="text-[15px] font-bold py-2 px-4 bg-green-500 text-white rounded"
              onClick={handleGeneratePDF}
            >
              Preview PDF
            </button>
          </div>
        </div>
        <TabPanel>
          <div className="flex justify-center">
            {universities.length > 0 ? (
              <FundCards universities={universities} />
            ) : (
              <p className="text-center text-gray-600">No colleges found</p>
            )}
          </div>
        </TabPanel>
      </Tabs>

      {pdfPreviewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg relative max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setPdfPreviewUrl(null)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">PDF Preview</h2>
            <iframe
              src={pdfPreviewUrl}
              width="100%"
              height="500px"
              title="PDF Preview"
              className="border"
            />
            <div className="text-right mt-4">
              <button
                className="text-[15px] font-bold py-2 px-4 bg-blue-500 text-white rounded"
                onClick={handleDownloadPDF}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

