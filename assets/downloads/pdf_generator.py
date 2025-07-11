#!/usr/bin/env python3
"""
Simple PDF generator using minimal dependencies
"""

def create_simple_pdf_content(title, content):
    """Create basic PDF content structure"""
    # This is a simplified PDF structure
    pdf_objects = []
    
    # Object 1: Catalog
    pdf_objects.append("""1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj""")
    
    # Object 2: Pages
    pdf_objects.append("""2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj""")
    
    # Object 3: Page
    pdf_objects.append("""3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/Contents 4 0 R
>>
endobj""")
    
    # Object 4: Content stream
    content_stream = f"""BT
/F1 12 Tf
50 750 Td
({title}) Tj
0 -20 Td
({content}) Tj
ET"""
    
    pdf_objects.append(f"""4 0 obj
<<
/Length {len(content_stream)}
>>
stream
{content_stream}
endstream
endobj""")
    
    # Calculate positions for xref table
    header = "%PDF-1.4\n"
    current_pos = len(header)
    xref_positions = [0]  # Object 0 is always 0
    
    for obj in pdf_objects:
        xref_positions.append(current_pos)
        current_pos += len(obj) + 1  # +1 for newline
    
    # Build xref table
    xref_table = f"""xref
0 {len(xref_positions)}
"""
    for i, pos in enumerate(xref_positions):
        if i == 0:
            xref_table += f"{pos:010d} 65535 f \n"
        else:
            xref_table += f"{pos:010d} 00000 n \n"
    
    # Trailer
    startxref_pos = current_pos
    trailer = f"""trailer
<<
/Size {len(xref_positions)}
/Root 1 0 R
>>
startxref
{startxref_pos}
%%EOF"""
    
    # Combine all parts
    pdf_content = header
    for obj in pdf_objects:
        pdf_content += obj + "\n"
    pdf_content += xref_table + trailer
    
    return pdf_content

if __name__ == "__main__":
    # Test
    content = create_simple_pdf_content("Test Title", "Test Content")
    print("PDF generator ready")