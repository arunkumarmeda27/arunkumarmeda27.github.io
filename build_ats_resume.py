import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT

def generate_ats_resume(output_path="resume.pdf"):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )

    styles = getSampleStyleSheet()

    # Define ATS-friendly clean styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#0F172A')
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#334155')
    )

    section_heading_style = ParagraphStyle(
        'SectionHeadingStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#1E293B')
    )

    bold_body_style = ParagraphStyle(
        'BoldBodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12.5,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#0F172A')
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2,
        textColor=colors.HexColor('#1E293B')
    )

    story = []

    # Header Name & Contact Info
    story.append(Paragraph("ARUN KUMAR MEDA", name_style))
    story.append(Spacer(1, 4))
    contact_text = "Bengaluru, India &bull; medaarun390@gmail.com &bull; linkedin.com/in/arun-kumar-meda-557b051b8 &bull; github.com/arunkumarmeda27"
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 8))

    def add_section_header(title):
        story.append(Paragraph(title.upper(), section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#0F172A'), spaceBefore=1, spaceAfter=5))

    # Summary
    add_section_header("Professional Summary")
    summary_text = (
        "Enthusiastic Software Engineer and Front-End AI Engineering Intern with a strong foundation in JavaScript, Python, C/C++, "
        "and modern web architectures. Proven track record in building high-performance web applications, developing full-stack project "
        "management systems, and competing in national hackathons (Top 37 Finalist). Active open-source contributor passionate about "
        "building user-centric interfaces and intelligent software solutions."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 8))

    # Technical Skills
    add_section_header("Technical Skills")
    skills_data = [
        "<b>Programming Languages:</b> JavaScript (ES6+), C, C++, Python, HTML5, CSS3, SQL",
        "<b>Frontend & Web Frameworks:</b> React.js, HTML5, CSS3, Flexbox/Grid, Responsive Design, REST APIs",
        "<b>Backend & Cloud Technologies:</b> Node.js, FastAPI, Firestore NoSQL, MongoDB, Python Backend Workflows",
        "<b>Developer Tools & Practices:</b> Git, GitHub, VS Code, Linux Shell, Rate-Limiting Middleware, CI/CD"
    ]
    for skill in skills_data:
        story.append(Paragraph(f"&bull; {skill}", bullet_style))
    story.append(Spacer(1, 8))

    # Work Experience
    add_section_header("Work Experience & Internships")
    
    # FlyRank AI
    story.append(Paragraph("<font size='9.5'><b>FlyRank AI</b> &ndash; <i>Front-End AI Engineering Intern</i></font>", bold_body_style))
    story.append(Paragraph("<font color='#475569' size='8.5'>June 2026 &ndash; Present | 12 Weeks Internship | Bengaluru, India</font>", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("&bull; Selected for intensive internship program to design, build, and optimize high-performance frontend interfaces.", bullet_style))
    story.append(Paragraph("&bull; Collaborated on integrating Artificial Intelligence feature workflows into responsive web application UIs.", bullet_style))
    story.append(Paragraph("&bull; Utilized modern frontend technologies and design patterns to deliver scalable, cross-browser compatible web pages.", bullet_style))
    story.append(Spacer(1, 6))

    # DSCE ERP
    story.append(Paragraph("<font size='9.5'><b>DSCE ERP Management System</b> &ndash; <i>Lead Developer</i></font>", bold_body_style))
    story.append(Paragraph("<font color='#475569' size='8.5'>Academic Year 2025 &ndash; 2026 | DSCE Bengaluru</font>", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("&bull; Engineered a unified mini-project management platform for 500+ engineering students using React, FastAPI, and Firestore.", bullet_style))
    story.append(Paragraph("&bull; Built an automated guide allocation algorithm that reduced manual project assignment overhead by 80%.", bullet_style))
    story.append(Paragraph("&bull; Implemented rate-limiting security middleware and role-based access control (RBAC) to ensure system reliability.", bullet_style))
    story.append(Spacer(1, 8))

    # Key Projects & Achievements
    add_section_header("Key Projects & Achievements")
    story.append(Paragraph("<font size='9.5'><b>National Agriculture Tech Solution</b> &ndash; <i>Team Lead & Core Developer</i></font>", bold_body_style))
    story.append(Paragraph("<font color='#475569' size='8.5'>Jan 2026 | IBM & ACM Co-sponsored Hackathon</font>", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("&bull; Led Team <i>Alpha_Coders</i> to develop an automated agricultural monitoring solution during a national hackathon.", bullet_style))
    story.append(Paragraph("&bull; Selected among <b>Top 37 National Finalists</b> out of thousands of participating developer teams across India.", bullet_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("<font size='9.5'><b>Open Source & Web Applications</b> &ndash; <i>Contributor & Developer</i></font>", bold_body_style))
    story.append(Paragraph("<font color='#475569' size='8.5'>2024 &ndash; Present | GitHub Profile</font>", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("&bull; Authored and maintained multiple public GitHub repositories showcasing clean code, UI design, and web tools.", bullet_style))
    story.append(Paragraph("&bull; Contributed 100+ commits across open-source repositories with clean documentation and responsive designs.", bullet_style))
    story.append(Spacer(1, 8))

    # Education
    add_section_header("Education")
    story.append(Paragraph("<b>Dayananda Sagar College of Engineering (DSCE)</b>, Bengaluru, India", bold_body_style))
    story.append(Paragraph("<i>Bachelor of Engineering (B.E.) in Information Science & Engineering (ISE)</i> <font color='#475569' size='8.5'>(2024 &ndash; Present)</font>", body_style))
    story.append(Paragraph("<b>Relevant Coursework:</b> Data Structures & Algorithms, Object-Oriented Programming (C++/Java), Database Systems, Web Engineering, Operating Systems.", body_style))
    story.append(Spacer(1, 8))

    # Certifications & Honors
    add_section_header("Certifications & Honors")
    story.append(Paragraph("&bull; <b>Top 37 National Finalist:</b> Tech For Agriculture National Hackathon co-sponsored by IBM & ACM (Jan 2026)", bullet_style))
    story.append(Paragraph("&bull; <b>Mastering C & C++ Programming:</b> Certified by Udemy (Jan 2025)", bullet_style))

    doc.build(story)
    print(f"ATS Resume generated successfully at: {output_path}")

if __name__ == "__main__":
    generate_ats_resume()
