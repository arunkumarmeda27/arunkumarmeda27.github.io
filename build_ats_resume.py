from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT

def generate_ats_resume(output_path="resume.pdf"):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    PRIMARY   = colors.HexColor('#0F172A')
    ACCENT    = colors.HexColor('#1D4ED8')
    TEXT      = colors.HexColor('#1E293B')
    MUTED     = colors.HexColor('#64748B')
    DIVIDER   = colors.HexColor('#CBD5E1')

    # --- Styles ---
    name_style = ParagraphStyle(
        'Name', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=22, leading=26,
        alignment=TA_CENTER, textColor=PRIMARY
    )
    title_style = ParagraphStyle(
        'Title', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=10, leading=13,
        alignment=TA_CENTER, textColor=ACCENT, spaceBefore=2
    )
    contact_style = ParagraphStyle(
        'Contact', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8.5, leading=12,
        alignment=TA_CENTER, textColor=MUTED, spaceBefore=4
    )
    section_style = ParagraphStyle(
        'Section', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=10.5, leading=13,
        alignment=TA_LEFT, textColor=PRIMARY, spaceBefore=10, spaceAfter=1
    )
    job_title_style = ParagraphStyle(
        'JobTitle', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=9.5, leading=12,
        alignment=TA_LEFT, textColor=PRIMARY
    )
    meta_style = ParagraphStyle(
        'Meta', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8.5, leading=11.5,
        alignment=TA_LEFT, textColor=MUTED, spaceBefore=1
    )
    body_style = ParagraphStyle(
        'Body', parent=styles['Normal'],
        fontName='Helvetica', fontSize=9, leading=12,
        alignment=TA_LEFT, textColor=TEXT
    )
    bullet_style = ParagraphStyle(
        'Bullet', parent=styles['Normal'],
        fontName='Helvetica', fontSize=9, leading=12,
        alignment=TA_LEFT, textColor=TEXT,
        leftIndent=14, firstLineIndent=-10, spaceAfter=3
    )

    def section(title):
        return [
            Paragraph(title.upper(), section_style),
            HRFlowable(width="100%", thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=5)
        ]

    def bullet(text):
        return Paragraph(f"&bull; {text}", bullet_style)

    story = []

    # ── HEADER ────────────────────────────────────────────────────────────────
    story.append(Paragraph("ARUN KUMAR MEDA", name_style))
    story.append(Paragraph("Software Engineer &nbsp;|&nbsp; Front-End AI Engineering Intern", title_style))
    story.append(Paragraph(
        "+91 9686097551 &nbsp;|&nbsp; arunkumarmeda27@gmail.com &nbsp;|&nbsp; "
        "linkedin.com/in/arun-kumar-meda-557b051b8 &nbsp;|&nbsp; "
        "github.com/arunkumarmeda27 &nbsp;|&nbsp; Bengaluru, India",
        contact_style
    ))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceBefore=7, spaceAfter=2))

    # ── SUMMARY ───────────────────────────────────────────────────────────────
    story.extend(section("Professional Summary"))
    story.append(Paragraph(
        "High-performing Software Engineer and Front-End AI Engineering Intern with proficiency in "
        "JavaScript (ES6+), React, C/C++, and Python. Demonstrated success engineering production-grade "
        "web platforms serving 500+ users, reducing operational overhead by 80%, and ranking in the "
        "<b>Top 37 National Finalists (Top 1.5%) out of 2,500+ teams</b>. "
        "Skilled at converting complex requirements into fast, accessible, user-centric interfaces.",
        body_style
    ))

    # ── TECHNICAL SKILLS ──────────────────────────────────────────────────────
    story.extend(section("Technical Skills"))
    story.append(Paragraph(
        "<b>Languages:</b> JavaScript (ES6+), C, C++, Python, HTML5, CSS3, SQL", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "<b>Frontend:</b> React.js, Vite, Web APIs, CSS Flexbox/Grid, Responsive Design, Component Architecture", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "<b>Backend & Databases:</b> Node.js, FastAPI, REST APIs, Firebase Firestore, MongoDB, Python Server-Side", body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "<b>Tools & Practices:</b> Git, GitHub, VS Code, Linux Shell, RBAC Authentication, Rate-Limiting Middleware, CI/CD", body_style))

    # ── WORK EXPERIENCE ───────────────────────────────────────────────────────
    story.extend(section("Work Experience & Internships"))

    # FlyRank AI
    story.append(Paragraph("Front-End AI Engineering Intern &nbsp;&mdash;&nbsp; <font color='#1D4ED8'>FlyRank AI</font>", job_title_style))
    story.append(Paragraph("June 2026 &ndash; Present &nbsp;|&nbsp; 12-Week Internship &nbsp;|&nbsp; Bengaluru, India", meta_style))
    story.append(Spacer(1, 3))
    story.append(bullet("Selected out of 200+ applicants; designed and shipped <b>15+ production-ready React web interfaces</b>, increasing user engagement metrics by <b>35%</b> within the first 6 weeks."))
    story.append(bullet("Architected <b>5 AI-driven feature workflows</b> integrating third-party ML APIs, cutting client-side UI rendering latency by <b>40%</b> and reducing average page load time from 3.2s to 1.9s."))
    story.append(bullet("Refactored <b>20+ legacy CSS/JS modules</b> into a reusable component library of 30 components, accelerating team feature deployment velocity by <b>25%</b> and eliminating 300+ lines of duplicate code."))
    story.append(Spacer(1, 5))

    # DSCE ERP
    story.append(Paragraph("Lead Developer &nbsp;&mdash;&nbsp; <font color='#1D4ED8'>DSCE ERP Management System</font>", job_title_style))
    story.append(Paragraph("Academic Year 2025 &ndash; 2026 &nbsp;|&nbsp; DSCE Bengaluru", meta_style))
    story.append(Spacer(1, 3))
    story.append(bullet("Architected and delivered a full-stack mini-project management platform serving <b>500+ engineering students</b> and <b>30+ faculty</b> using React, FastAPI, and Firestore — reducing project registration time by <b>60%</b>."))
    story.append(bullet("Built an automated guide allocation algorithm that matched <b>200+ student projects to guides in under 2 seconds</b>, eliminating 100% of manual scheduling conflicts and saving <b>40+ administrative hours</b> per semester."))
    story.append(bullet("Implemented token-bucket rate-limiting middleware and role-based access control (RBAC), sustaining <b>99.9% uptime</b> across <b>10,000+ monthly requests</b> with zero security incidents."))

    # ── KEY PROJECTS ──────────────────────────────────────────────────────────
    story.extend(section("Key Projects & Achievements"))

    # Hackathon
    story.append(Paragraph("National Agriculture Tech Solution &nbsp;&mdash;&nbsp; <font color='#1D4ED8'>Team Lead (Alpha_Coders)</font>", job_title_style))
    story.append(Paragraph("Jan 2026 &nbsp;|&nbsp; IBM & ACM Co-sponsored National Hackathon &nbsp;|&nbsp; 36-Hour Event", meta_style))
    story.append(Spacer(1, 3))
    story.append(bullet("Led a <b>4-person developer team</b> to design, build, and demo an automated IoT/AI crop-health monitoring platform entirely within a <b>36-hour hackathon</b> window."))
    story.append(bullet("Ranked in the <b>Top 37 National Finalists (Top 1.5%)</b> out of <b>2,500+ competing developer teams</b> across all states of India, co-judged by IBM and ACM."))
    story.append(bullet("Developed 3 real-time telemetry dashboards processing crop sensor streams for <b>100+ simulated agricultural fields</b>, with sub-500ms data refresh rates."))
    story.append(Spacer(1, 5))

    # Open Source
    story.append(Paragraph("Open Source Contributions & Web Applications &nbsp;&mdash;&nbsp; <font color='#1D4ED8'>Developer</font>", job_title_style))
    story.append(Paragraph("2024 &ndash; Present &nbsp;|&nbsp; github.com/arunkumarmeda27", meta_style))
    story.append(Spacer(1, 3))
    story.append(bullet("Authored and maintain <b>10+ public GitHub repositories</b> with <b>100+ commits</b> and 95%+ documentation coverage, consistently maintaining code quality scores above 90/100."))
    story.append(bullet("Optimized critical rendering paths and asset bundle sizes across 3 web projects, improving <b>Google Lighthouse Performance scores from 72 to 98/100</b> — a 36-point gain."))

    # ── EDUCATION ─────────────────────────────────────────────────────────────
    story.extend(section("Education"))
    story.append(Paragraph("Bachelor of Engineering (B.E.) in Information Science & Engineering (ISE)", job_title_style))
    story.append(Paragraph("Dayananda Sagar College of Engineering (DSCE), Bengaluru &nbsp;|&nbsp; 2024 &ndash; Present", meta_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "<b>Relevant Coursework:</b> Data Structures & Algorithms, Object-Oriented Programming (C++/Java), "
        "Database Management Systems, Web Engineering, Operating Systems, Computer Networks.",
        body_style
    ))

    # ── CERTIFICATIONS & HONORS ───────────────────────────────────────────────
    story.extend(section("Certifications & Honors"))
    story.append(bullet("<b>Top 37 National Finalist (Top 1.5%)</b> — Tech For Agriculture National Hackathon, co-sponsored by IBM & ACM (Jan 2026)"))
    story.append(bullet("<b>Mastering C & C++ Programming</b> — Udemy Certified (Jan 2025)"))

    doc.build(story)
    print(f"ATS-optimised single-column resume generated at: {output_path}")

if __name__ == "__main__":
    generate_ats_resume()
