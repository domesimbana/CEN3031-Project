import PyPDF2  # Import PyPDF2 library for working with PDF files
import sys  # Import sys module for system-specific parameters and functions

def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF file.

    Args:
    pdf_path (str): The path to the PDF file.

    Returns:
    str: Extracted text from the PDF.
    """
    text = ""  # Initialize an empty string to store extracted text
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)  # Create a PdfReader object
        for page_number in range(len(reader.pages)):
            page = reader.pages[page_number]  # Get the page object
            text += page.extract_text()  # Extract text from the page and append to the text string
    return text  # Return the extracted text

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_text.py <pdf_file_path>")  # Display usage message if PDF file path is not provided
        sys.exit(1)  
    
    pdf_path = sys.argv[1]  
    text = extract_text_from_pdf(pdf_path)  
    print(text)  # Print the extracted text
