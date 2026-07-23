import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def generate_ats_resume(output_path="resume.pdf"):
    # Letter size: 612 x 792 pt. Margins: 28pt left/right/top/bottom
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=28,
        rightMargin=28,
        topMargin=26,
        bottomMargin=26
    )

    styles = getSampleStyleSheet()

    # Color Palette: Deep Navy (#0F172A), Royal Blue (#2563EB), Slate (#475569), Light Accent (#F8FAFC)
    PRIMARY_COLOR = colors.HexColor('#0F172A')
    ACCENT_COLOR = colors.HexColor('#2563EB')
    TEXT_COLOR = colors.HexColor('#1E293B')
    MUTED_COLOR = colors.HexColor('#64748B')
    LINE_COLOR = colors.HexColor('#CBD5E1')

    # Typography Styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=TA_LEFT,
        textColor=PRIMARY_COLOR
    )

    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        alignment=TA_LEFT,
        textColor=ACCENT_COLOR
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        alignment=TA_RIGHT,
        textColor=MUTED_COLOR
    )

    section_heading_style = ParagraphStyle(
        'SectionHeadingStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        alignment=TA_LEFT,
        textColor=PRIMARY_COLOR,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        alignment=TA_LEFT,
        textColor=TEXT_COLOR
    )

    bold_body_style = ParagraphStyle(
        'BoldBodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        alignment=TA_LEFT,
        textColor=PRIMARY_COLOR
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.3,
        leading=11.2,
        leftIndent=8,
        firstLineIndent=-6,
        spaceAfter=2,
        textColor=TEXT_COLOR
    )

    skill_badge_style = ParagraphStyle(
        'SkillBadgeStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=TEXT_COLOR
    )

    story = []

    # 1. HEADER TABLE (Left: Name & Subtitle, Right: Contact Details + Phone Number)
    header_left = [
        Paragraph("ARUN KUMAR MEDA", name_style),
        Spacer(1, 2),
        Paragraph("SOFTWARE ENGINEER &bull; FRONT-END AI INTERN", title_style)
    ]

    header_right = [
        Paragraph("<b>Phone:</b> +91 91082 34567", contact_style),
        Paragraph("<b>Email:</b> medaarun390@gmail.com", contact_style),
        Paragraph("<b>LinkedIn:</b> linkedin.com/in/arun-kumar-meda-557b051b8", contact_style),
        Paragraph("<b>GitHub:</b> github.com/arunkumarmeda27", contact_style),
        Paragraph("<b>Location:</b> Bengaluru, India", contact_style)
    ]

    header_table = Table([[header_left, header_right]], colWidths=[310, 246])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))

    story.append(header_table)
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT_COLOR, spaceBefore=0, spaceAfter=8))

    def make_section_header(title):
        return [
            Paragraph(title.upper(), section_heading_style),
            HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceBefore=1, spaceAfter=4)
        ]

    # LEFT COLUMN (Width: ~325pt) -> EXPERIENCE, PROJECTS, EDUCATION
    left_content = []

    # Experience Section
    left_content.extend(make_section_header("Work Experience & Internships"))

    # FlyRank AI
    left_content.append(Paragraph("<b>FlyRank AI</b> &ndash; <font color='#2563EB'>Front-End AI Engineering Intern</font>", bold_body_style))
    left_content.append(Paragraph("<font color='#64748B' size='7.8'>June 2026 &ndash; Present | 12 Weeks Internship | Bengaluru, India</font>", body_style))
    left_content.append(Spacer(1, 2))
    left_content.append(Paragraph("&bull; Selected out of 200+ applicants for engineering internship; built 15+ responsive React web interfaces, boosting engagement by 35%.", bullet_style))
    left_content.append(Paragraph("&bull; Architected 5+ AI-driven feature workflows, optimizing API response handling and reducing UI rendering latency by 40%.", bullet_style))
    left_content.append(Paragraph("&bull; Refactored legacy CSS/JS modules into reusable component libraries, accelerating frontend feature deployment velocity by 25%.", bullet_style))
    left_content.append(Spacer(1, 6))

    # DSCE ERP
    left_content.append(Paragraph("<b>DSCE ERP System</b> &ndash; <font color='#2563EB'>Lead Developer</font>", bold_body_style))
    left_content.append(Paragraph("<font color='#64748B' size='7.8'>Academic Year 2025 &ndash; 2026 | DSCE Bengaluru</font>", body_style))
    left_content.append(Spacer(1, 2))
    left_content.append(Paragraph("&bull; Architected full-stack mini-project platform for 500+ engineering students and 30+ faculty using React, FastAPI, and Firestore.", bullet_style))
    left_content.append(Paragraph("&bull; Designed automated guide allocation algorithm, eliminating 100% of manual scheduling conflicts and saving 40+ hours/semester.", bullet_style))
    left_content.append(Paragraph("&bull; Implemented rate-limiting middleware and RBAC protocols, achieving 99.9% system uptime and zero security breaches.", bullet_style))
    left_content.append(Spacer(1, 8))

    # Key Projects & Achievements
    left_content.extend(make_section_header("Key Projects & Achievements"))

    # Hackathon
    left_content.append(Paragraph("<b>National Agriculture Tech Solution</b> &ndash; <font color='#2563EB'>Team Lead</font>", bold_body_style))
    left_content.append(Paragraph("<font color='#64748B' size='7.8'>Jan 2026 | IBM & ACM Co-sponsored National Hackathon</font>", body_style))
    left_content.append(Spacer(1, 2))
    left_content.append(Paragraph("&bull; Led 4-developer team (Alpha_Coders) to build an automated IoT/AI agricultural monitoring platform during a 36-hour hackathon.", bullet_style))
    left_content.append(Paragraph("&bull; Ranked in <b>Top 37 National Finalists (Top 1.5%)</b> out of 2,500+ competing developer teams across India.", bullet_style))
    left_content.append(Paragraph("&bull; Developed telemetry dashboards rendering real-time crop sensor data points for 100+ simulated fields.", bullet_style))
    left_content.append(Spacer(1, 6))

    # Open Source
    left_content.append(Paragraph("<b>Open Source & Web Applications</b> &ndash; <font color='#2563EB'>Developer</font>", bold_body_style))
    left_content.append(Paragraph("<font color='#64748B' size='7.8'>2024 &ndash; Present | GitHub Profile</font>", body_style))
    left_content.append(Spacer(1, 2))
    left_content.append(Paragraph("&bull; Authored 10+ public GitHub repositories with 100+ commits, 95%+ documentation coverage, and web tools.", bullet_style))
    left_content.append(Paragraph("&bull; Optimized bundle sizes and critical rendering paths, improving Google Lighthouse scores from 72 to 98/100.", bullet_style))
    left_content.append(Spacer(1, 8))

    # Education
    left_content.extend(make_section_header("Education"))
    left_content.append(Paragraph("<b>Dayananda Sagar College of Engineering (DSCE)</b>", bold_body_style))
    left_content.append(Paragraph("<i>B.E. in Information Science & Engineering (ISE)</i> <font color='#64748B' size='7.8'>(2024 &ndash; Present)</font>", body_style))
    left_content.append(Paragraph("<b>Coursework:</b> Data Structures, DBMS, Web Engineering, OOP (C++/Java), OS.", body_style))

    # RIGHT COLUMN (Width: ~220pt) -> SUMMARY, SKILLS, CERTIFICATIONS
    right_content = []

    # Summary Section
    right_content.extend(make_section_header("Professional Summary"))
    summary_text = (
        "High-performing Software Engineer and Front-End AI Engineering Intern proficient in JavaScript (ES6+), "
        "React, C/C++, and Python. Demonstrated success in engineering web platforms for 500+ users, reducing project "
        "overhead by 80%, and ranking in the Top 37 National Finalists out of 2,500+ teams. Passionate about user-centric UIs."
    )
    right_content.append(Paragraph(summary_text, body_style))
    right_content.append(Spacer(1, 8))

    # Skills Section
    right_content.extend(make_section_header("Technical Skills"))

    skills_categories = [
        ("Core Languages", "JavaScript (ES6+), C, C++, Python, HTML5, CSS3, SQL"),
        ("Frontend & Web", "React.js, Vite, Web APIs, CSS Grid/Flexbox, Responsive Design, State Mgmt"),
        ("Backend & Databases", "Node.js, FastAPI, REST APIs, Firestore NoSQL, MongoDB, Python Systems"),
        ("Tools & Workflows", "Git, GitHub, VS Code, Linux Shell, RBAC Auth, Rate-Limiting, CI/CD")
    ]

    for cat_title, cat_skills in skills_categories:
        right_content.append(Paragraph(f"<b><font color='#2563EB'>{cat_title}</font></b>", bold_body_style))
        right_content.append(Paragraph(cat_skills, skill_badge_style))
        right_content.append(Spacer(1, 4))

    right_content.append(Spacer(1, 4))

    # Certifications & Honors
    right_content.extend(make_section_header("Certifications & Honors"))
    right_content.append(Paragraph("&bull; <b>Top 37 National Finalist (Top 1.5%):</b> Tech For Agriculture National Hackathon co-sponsored by IBM & ACM (Jan 2026)", bullet_style))
    right_content.append(Spacer(1, 3))
    right_content.append(Paragraph("&bull; <b>Mastering C & C++ Programming:</b> Certified by Udemy (Jan 2025)", bullet_style))

    # MAIN 2-COLUMN TABLE
    main_table = Table([[left_content, right_content]], colWidths=[326, 230])
    main_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (0,0), 0),
        ('RIGHTPADDING', (0,0), (0,0), 10),
        ('LEFTPADDING', (1,0), (1,0), 10),
        ('RIGHTPADDING', (1,0), (1,0), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))

    story.append(main_table)

    doc.build(story)
    print(f"Modern 2-Column High-Score ATS Resume generated successfully at: {output_path}")

if __name__ == "__main__":
    generate_ats_resume()
