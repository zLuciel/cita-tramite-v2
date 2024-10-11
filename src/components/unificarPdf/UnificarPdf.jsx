"use client"
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@mantine/core';

const UnificarPdf = ({filePdf,namePdf}) => {
   

  const mergePDFs = async () => {
    if (filePdf.length === 0) return;

    const mergedPdf = await PDFDocument.create();

    for (const file of filePdf) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
   
    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const fileConvert = new File([blob], namePdf || 'merged.pdf', { type: 'application/pdf' });
    console.log("viendo file del merge",fileConvert);
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = namePdf;
    a.click();
    URL.revokeObjectURL(url);

  };

 
  return (
    <div className='self-end'>
      {/* <input
        type="file"
        multiple
        accept="application/pdf"
        onChange={handleFileChange}
      /> */}
      {/* <button onClick={mergePDFs} disabled={files.length === 0}>
        Merge PDFs
      </button> */}

     <Button  disabled={filePdf === undefined ? true : false } onClick={mergePDFs} variant="default">
        UNIFICAR
      </Button>
    </div>
  );
};


export default UnificarPdf;
