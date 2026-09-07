import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
import pypdf

def generate_ats_resume(output_path="resume.pdf"):
    # Letter size: 612 x 792 points
    # Printable area with 34pt margins: 544 x 728 points
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=34,
        rightMargin=34,
        topMargin=26,
        bottomMargin=26
    )

    styles = getSampleStyleSheet()

    PRIMARY   = colors.HexColor('#0F172A') # Slate 900
    ACCENT    = colors.HexColor('#1D4ED8') # Blue 700
    TEXT      = colors.HexColor('#1E293B') # Slate 800
    MUTED     = colors.HexColor('#475569') # Slate 600

    name_style = ParagraphStyle(
        'Name', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=18.5, leading=21,
        alignment=TA_CENTER, textColor=PRIMARY
    )
    title_style = ParagraphStyle(
        'Title', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=9, leading=12,
        alignment=TA_CENTER, textColor=ACCENT, spaceBefore=2
    )
    contact_style = ParagraphStyle(
        'Contact', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8, leading=11,
        alignment=TA_CENTER, textColor=MUTED, spaceBefore=3
    )

    sec_style = ParagraphStyle(
        'Sec', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=9.5, leading=12,
        alignment=TA_LEFT, textColor=PRIMARY, spaceBefore=5, spaceAfter=1
    )

    job_l = ParagraphStyle('JobL', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=PRIMARY)
    job_r = ParagraphStyle('JobR', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=11, alignment=TA_RIGHT, textColor=ACCENT)
    sub_l = ParagraphStyle('SubL', parent=styles['Normal'], fontName='Helvetica', fontSize=7.8, leading=10, textColor=MUTED)
    sub_r = ParagraphStyle('SubR', parent=styles['Normal'], fontName='Helvetica', fontSize=7.8, leading=10, alignment=TA_RIGHT, textColor=MUTED)

    body_style = ParagraphStyle(
        'Body', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8, leading=10.5, textColor=TEXT
    )
    bullet_style = ParagraphStyle(
        'Bullet', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8, leading=10.5, textColor=TEXT,
        leftIndent=10, firstLineIndent=-7, spaceAfter=1.2
    )

    def section(title):
        return [
            Paragraph(title.upper(), sec_style),
            HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceBefore=1, spaceAfter=3)
        ]

    def entry_header(title, company, dates, location):
        data = [
            [
                Paragraph(f"<b>{title}</b> | <font color='#1D4ED8'><b>{company}</b></font>", job_l),
                Paragraph(dates, job_r)
            ],
            [
                Paragraph(location, sub_l),
                Paragraph("", sub_r)
            ]
        ]
        t = Table(data, colWidths=[395, 149])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ]))
        return t

    def bullet(text):
        return Paragraph(f"&bull; {text}", bullet_style)

    story = []

    # ── HEADER ────────────────────────────────────────────────────────────────
    story.append(Paragraph("ARUN KUMAR MEDA", name_style))
    story.append(Paragraph("Software Engineer | Front-End & AI Engineering Intern", title_style))
    story.append(Paragraph(
        "+91 9686097551 &nbsp;|&nbsp; arunkumarmeda27@gmail.com &nbsp;|&nbsp; "
        "linkedin.com/in/arun-kumar-meda-557b051b8 &nbsp;|&nbsp; "
        "github.com/arunkumarmeda27 &nbsp;|&nbsp; Bengaluru, India",
        contact_style
    ))
    story.append(HRFlowable(width="100%", thickness=1.2, color=ACCENT, spaceBefore=3, spaceAfter=2))

    # ── PROFESSIONAL SUMMARY ──────────────────────────────────────────────────
    story.extend(section("Professional Summary"))
    story.append(Paragraph(
        "Results-driven Software Engineer and Front-End AI Engineering Intern proficient in "
        "JavaScript (ES6+), React.js, Python, C/C++, and WordPress development. Demonstrated track record "
        "engineering production-grade web applications for 500+ users, reducing registration overhead by 60%, and ranking in the "
        "<b>Top 37 National Finalists (Top 1.5%) out of 2,500+ teams</b> in the IBM & ACM-sponsored Hackathon. "
        "Adept at translating design and business specifications into responsive, high-performance, accessible digital interfaces.",
        body_style
    ))

    # ── TECHNICAL SKILLS ──────────────────────────────────────────────────────
    story.extend(section("Technical Skills"))
    story.append(Paragraph("<b>Languages:</b> JavaScript (ES6+), Python, C, C++, HTML5, CSS3, SQL, PHP", body_style))
    story.append(Spacer(1, 0.5))
    story.append(Paragraph("<b>Frontend & CMS:</b> React.js, Vite, WordPress (Custom Themes & Plugins), Responsive UI, Flexbox/Grid, Web APIs", body_style))
    story.append(Spacer(1, 0.5))
    story.append(Paragraph("<b>Backend & Databases:</b> Node.js, FastAPI, RESTful APIs, Firebase Firestore, MongoDB", body_style))
    story.append(Spacer(1, 0.5))
    story.append(Paragraph("<b>Tools & Practices:</b> Git, GitHub, VS Code, Linux Shell, RBAC Auth, Core Web Vitals, Performance Tuning, Agile", body_style))

    # ── WORK EXPERIENCE & INTERNSHIPS ─────────────────────────────────────────
    story.extend(section("Work Experience & Internships"))

    # 1. FlyRank AI
    story.append(entry_header("Front-End AI Engineering Intern", "FlyRank AI", "June 2026 - Present", "Bengaluru, India (Remote)"))
    story.append(bullet("Selected from 200+ applicants; built and shipped <b>15+ production-ready React web interfaces</b>, accelerating user engagement by <b>35%</b>."))
    story.append(bullet("Architected 5 AI-driven UI workflows integrating third-party ML APIs, reducing client-side rendering latency by <b>40%</b> and load time from 3.2s to 1.9s."))
    story.append(bullet("Refactored 20+ legacy modules into a reusable design library of 30 components, speeding feature deployment by <b>25%</b>."))
    story.append(Spacer(1, 1.5))

    # 2. GEMA Education Technology
    story.append(entry_header("WordPress Developer Intern", "GEMA Education Technology Pvt. Ltd.", "July 2026 - Oct 2026", "Dubai, UAE (Remote | via Internshala)"))
    story.append(bullet("Designed, developed, and maintained custom WordPress platforms and educational portals for an international EdTech organization."))
    story.append(bullet("Implemented tailored themes and custom PHP/JS plugins to support dynamic business requirements; improved site navigation structure."))
    story.append(bullet("Optimized Core Web Vitals and site asset caching, resolving 15+ cross-browser rendering issues and reducing page bounce rates."))
    story.append(Spacer(1, 1.5))

    # 3. InAmigos Foundation
    story.append(entry_header("AI Web Development Intern", "InAmigos Foundation", "July 2026 - Aug 2026", "Remote (via Internshala)"))
    story.append(bullet("Engineered responsive, accessible web pages and digital initiatives for a CSR-registered non-profit organization using HTML5/CSS3/JS."))
    story.append(bullet("Integrated AI-assisted UI elements and streamlined interactive workflows, achieving 100% on-time milestone delivery across sprints."))
    story.append(Spacer(1, 1.5))

    # 4. DSCE ERP Management System
    story.append(entry_header("Lead Full-Stack Developer", "DSCE ERP Management System", "Academic Year 2025 - 2026", "DSCE Bengaluru, India"))
    story.append(bullet("Architected a full-stack mini-project portal serving <b>500+ students and 30+ faculty</b> using React, FastAPI, and Firestore - cutting registration time by <b>60%</b>."))
    story.append(bullet("Engineered automated guide allocation matching <b>200+ projects in under 2 seconds</b>, eliminating manual scheduling conflicts and saving <b>40+ admin hours</b>."))
    story.append(bullet("Implemented token-bucket rate limiting and RBAC authentication, maintaining <b>99.9% uptime</b> across 10,000+ monthly requests."))

    # ── KEY PROJECTS & ACHIEVEMENTS ───────────────────────────────────────────
    story.extend(section("Key Projects & Achievements"))

    # Hackathon
    story.append(entry_header("National Agriculture Tech Solution (Team Alpha_Coders)", "National Hackathon", "Jan 2026", "Jain University & IBM / ACM Co-sponsored"))
    story.append(bullet("Ranked in the <b>Top 37 National Finalists (Top 1.5%) out of 2,500+ teams</b> across India in a competitive 36-hour hackathon co-judged by IBM and ACM."))
    story.append(bullet("Built an automated IoT/AI crop-health monitoring platform with sub-500ms real-time telemetry dashboards across 100+ simulated agricultural fields."))
    story.append(Spacer(1, 1.5))

    # Open Source
    story.append(entry_header("Open Source Contributions & Web Engineering", "Developer", "2024 - Present", "github.com/arunkumarmeda27"))
    story.append(bullet("Maintained 10+ public GitHub repositories; optimized critical rendering paths across web apps, elevating Google Lighthouse scores to <b>98/100</b>."))

    # ── EDUCATION ─────────────────────────────────────────────────────────────
    story.extend(section("Education"))
    story.append(entry_header("B.E. in Information Science & Engineering (ISE)", "Dayananda Sagar College of Engineering", "2024 - Present", "Bengaluru, India"))
    story.append(Paragraph("<b>Relevant Coursework:</b> Data Structures & Algorithms, Object-Oriented Programming (C++/Java), Database Management Systems, Web Engineering, Operating Systems, Computer Networks", body_style))

    # ── CERTIFICATIONS & HONORS ───────────────────────────────────────────────
    story.extend(section("Certifications & Honors"))
    story.append(bullet("<b>Top 37 National Finalist (Top 1.5%)</b> - Tech For Agriculture National Hackathon, co-sponsored by IBM & ACM (Jan 2026)"))
    story.append(bullet("<b>Mastering C & C++ Programming: From Fundamentals to Advanced</b> - Udemy Certified (Jan 2025)"))
    story.append(bullet("<b>Responsive Web Design Certification</b> - freeCodeCamp Certified (2026)"))

    doc.build(story)
    reader = pypdf.PdfReader(output_path)
    print(f"ATS-optimised single-column resume generated at: {output_path}")
    print(f"Total Pages: {len(reader.pages)}")

if __name__ == "__main__":
    generate_ats_resume()
