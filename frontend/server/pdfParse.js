const pdfParse = require("pdf-parse");
const fs = require("fs");

const parsePDF = async (pdfFilePath) => {
  try {
    // Read the PDF file
    const pdfBuffer = fs.readFileSync(pdfFilePath);

    // Parse the PDF buffer to extract text content
    const data = await pdfParse(pdfBuffer);

    // Extract text content from the parsed data
    const text = data.text;

    return text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw error;
  }
};
