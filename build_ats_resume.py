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

    # Define ATS-optimized high-contrast typography
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
        spaceAfter=2.5,
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

    # Professional Summary
    add_section_header("Professional Summary")
    summary_text = (
        "High-performing Software Engineer and Front-End AI Engineering Intern with strong proficiency in JavaScript (ES6+), "
        "React, C/C++, and Python. Demonstrated success in engineering full-stack web applications for 500+ users, reducing project "
        "assignment overhead by 80%, and placing as a Top 37 National Finalist out of 2,500+ teams. Skilled in building responsive, "
        "high-throughput user interfaces, integrating AI feature workflows, and optimizing web performance metrics."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 8))

    # Technical Skills
    add_section_header("Technical Skills")
    skills_data = [
        "<b>Core Languages:</b> JavaScript (ES6+), C, C++, Python, HTML5, CSS3, SQL",
        "<b>Frontend & UI Engineering:</b> React.js, Vite, Web APIs, CSS Flexbox/Grid, Responsive Web Design, State Management",
        "<b>Backend & Databases:</b> Node.js, FastAPI, RESTful APIs, Firebase Firestore NoSQL, MongoDB, Python Backend Systems",
        "<b>Tools & Security:</b> Git, GitHub, VS Code, Linux Shell, RBAC Authentication, Rate-Limiting Middleware, CI/CD"
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
    story.append(Paragraph("&bull; Selected out of 200+ applicants for 12-week engineering internship; engineered 15+ responsive web interfaces, boosting user engagement by 35%.", bullet_style))
    story.append(Paragraph("&bull; Architected 5+ AI-driven feature workflows, optimizing API response handling and reducing client-side UI rendering latency by 40%.", bullet_style))
    story.append(Paragraph("&bull; Refactored legacy CSS/JS modules into reusable component libraries, accelerating frontend feature deployment velocity by 25%.", bullet_style))
    story.append(Spacer(1, 6))

    # DSCE ERP
    story.append(Paragraph("<font size='9.5'><b>DSCE ERP Management System</b> &ndash; <i>Lead Developer</i></font>", bold_body_style))
    story.append(Paragraph("<font color='#475569' size='8.5'>Academic Year 2025 &ndash; 2026 | DSCE Bengaluru</font>", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("&bull; Architected a full-stack mini-project management system for 500+ engineering students and 30+ faculty using React, FastAPI, and Firestore.", bullet_style))
    story.append(Paragraph("&bull; Designed an automated guide allocation algorithm, eliminating 100% of manual scheduling conflicts and saving 40+ hours per semester.", bullet_style))
    story.append(Paragraph("&bull; Implemented token bucket rate-limiting middleware and RBAC protocols, achieving 99.9% uptime and zero security breaches.", bullet_style))
    story.append(Spacer(1, 8))

    # Key Projects & Achievements
    add_section_header("Key Projects & Achievements")
    story.append(Paragraph("<font size='9.5'><b>National Agriculture Tech Solution</b> &ndash; <i>Team Lead & Core Developer</i></font>", bold_body_style))
    story.append(Paragraph("<font color='#475569' size='8.5'>Jan 2026 | IBM & ACM Co-sponsored National Hackathon</font>", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("&bull; Led 4-developer team (Alpha_Coders) to build an automated IoT/AI agricultural monitoring platform during a 36-hour hackathon.", bullet_style))
    story.append(Paragraph("&bull; Ranked in the <b>Top 37 National Finalists</b> out of 2,500+ competing developer teams across India.", bullet_style))
    story.append(Paragraph("&bull; Developed interactive telemetry dashboards rendering real-time crop sensor data points for 100+ simulated agricultural fields.", bullet_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("<font size='9.5'><b>Open Source & Web Applications</b> &ndash; <i>Contributor & Developer</i></font>", bold_body_style))
    story.append(Paragraph("<font color='#475569' size='8.5'>2024 &ndash; Present | GitHub Profile</font>", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("&bull; Authored 10+ public GitHub repositories with 100+ commits, 95%+ documentation coverage, and responsive web tools.", bullet_style))
    story.append(Paragraph("&bull; Optimized web application bundle sizes and critical rendering paths, improving Google Lighthouse performance scores from 72 to 98/100.", bullet_style))
    story.append(Spacer(1, 8))

    # Education
    add_section_header("Education")
    story.append(Paragraph("<b>Dayananda Sagar College of Engineering (DSCE)</b>, Bengaluru, India", bold_body_style))
    story.append(Paragraph("<i>Bachelor of Engineering (B.E.) in Information Science & Engineering (ISE)</i> <font color='#475569' size='8.5'>(2024 &ndash; Present)</font>", body_style))
    story.append(Paragraph("<b>Relevant Coursework:</b> Data Structures & Algorithms, Object-Oriented Programming (C++/Java), Database Management Systems, Web Engineering, Operating Systems.", body_style))
    story.append(Spacer(1, 8))

    # Certifications & Honors
    add_section_header("Certifications & Honors")
    story.append(Paragraph("&bull; <b>Top 37 National Finalist (Top 1.5%):</b> Tech For Agriculture National Hackathon co-sponsored by IBM & ACM (Jan 2026)", bullet_style))
    story.append(Paragraph("&bull; <b>Mastering C & C++ Programming:</b> Certified by Udemy (Jan 2025)", bullet_style))

    doc.build(story)
    print(f"High-scoring ATS Resume generated successfully at: {output_path}")

if __name__ == "__main__":
    generate_ats_resume()
