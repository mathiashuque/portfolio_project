export const PORTFOLIO_CONTEXT = `
PORTFOLIO CONTEXT — the single source of truth about me, my background, my projects,
my experience and how to reach me.

Info about me:

Quick Summary

I’m Mathias Huque, a software developer from Uruguay focused on building fast, reliable web applications with clean architecture and great user experience.

Mathias Huque is a Software Engineer from Uruguay who builds software applications that turn ideas into reality. He started programming at age 15 and is currently pursuing a degree in Systems Engineering at Universidad ORT Uruguay.

He is interested in both frontend and backend development, with a strong focus on performance, clean architecture, and user experience.

Values clean architecture, performance, great UX
Working style clear communication, pragmatic engineering, iterative delivery
Enjoys building products end-to-end, improving performance, and maintaining clean codebases.

Languages spoken English and Spanish
Timezone AmericaMontevideo (UTC-0300)
Date of Birth February 2004

Location & Work Preferences

Based in Uruguay.
Open to remote work and relocation depending on role and location.
Prefers remote-friendly teams.
Available for internships, junior roles, freelance, contract, part-time, or full-time work.
Start timeline flexible by agreement.

Open to Work

Actively seeking opportunities and open to contact regarding internships, junior roles, part-time, or full-time positions. Preferred contact via Email or LinkedIn.

Education

Systems Engineering — Universidad ORT Uruguay (Bachelor in Software Engineering awarded January 2026; currently completing degree, expected to graduate as Systems Engineer in March 2027)

Strong foundations in software engineering, algorithms, data structures, databases, and systems.

Experience

Assistant Professor — Data Structures & Algorithms (Universidad ORT Uruguay)
Professor — Fundamentals of Computing (Universidad ORT Uruguay)

Focus on teaching programming fundamentals, explaining complex concepts clearly, and helping students with exercises and grading.

Technical Stack

Programming Languages
C++, C#, JavaScript, TypeScript, Python, Java, SQL

Frontend
Angular, React, Next.js, React Native, HTML5, CSS, Tailwind CSS

Backend
Node.js, Express.js, NestJS, .NET, Entity Framework Core, GraphQL, REST APIs

Databases
PostgreSQL, MySQL, MongoDB, SQL Server
ORMs Prisma, Sequelize, Mongoose

Cloud & DevOps
AWS, Google Cloud, Azure, Docker, Git, GitHub, CICD, Linux, Vercel, Firebase

Testing
Jest, Jasmine, Cypress, Cucumber

Tools & Methodologies
Postman, Figma, Scrum, Agile

Projects

Hireflow — built with ASP.NET Core (.NET 10), Entity Framework Core, PostgreSQL, Next.js, React, TypeScript, and Tailwind CSS
Multi-tenant hiring tracker where teams create isolated workspaces, post job openings, and move candidates through an auditable hiring pipeline
Demonstrates database-enforced tenant isolation, server-side role authorization, cookie sessions with CSRF protection, optimistic concurrency, atomic writes, and a consistent problem-details API contract
Tested with xUnit and Testcontainers against PostgreSQL; containerized and deployed with Render, Neon, and Vercel
Live https://hireflow.mathiashuque.dev/

SILO — Integrated Bidding & Opportunity Management Platform, built as a Dockerized TypeScript monorepo with Next.js, NestJS, and PostgreSQL
In-development Systems Engineering capstone project at Universidad ORT Uruguay, developed with SONDA Uruguay
Manages the complete bidding lifecycle: case files, go/no-go decisions, credentials, tasks, documents, and analytics
Includes a dedicated AI worker, OCR, Elasticsearch full-text search, S3-compatible MinIO storage, RabbitMQ messaging, and self-hosted Grafana observability
No public deployment or public source repository yet

Portfolio Website — built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4
Bilingual (English/Spanish) via next-intl, animations with Framer Motion
Includes this AI chat assistant (OpenAI Agents SDK) with rate limiting and conversation history backed by Upstash Redis, and a contact form powered by Resend
Fast, responsive UI with clean structure
Showcases projects, experience, and contact information
Live https://www.mathiashuque.dev

Algorithm Visualizer — built with React, TypeScript, and Tailwind CSS
Interactive tool to explore how common algorithms work step by step
Live https://algoviz.mathiashuque.dev/

Interview Forge — built with React, TypeScript, and Tailwind CSS
Practice technical interviews with real questions
Live https://interview-forge.mathiashuque.dev/

ML Playground — built with Next.js, TypeScript, and Tailwind CSS
Interactive lab for exploring machine learning concepts hands-on
Live https://ml-playground.mathiashuque.dev/en

FavForge — built with Next.js, TypeScript, and Tailwind CSS
Favicon generator that previews a logo across browser tabs, search results, and mobile home screens, then exports a validated, ready-to-ship favicon package (ICO, PNG icons, web manifest, setup instructions)
Live https://favforge.mathiashuque.dev/

MyPDF — built with Next.js, TypeScript, and Tailwind CSS
Focused set of document utilities: merge PDFs, split pages apart, and convert to and from PDF. No account required; Convert to PDF runs entirely client-side, other tools process files server-side without storing them
Live https://my-pdf.mathiashuque.dev/en

DocuLens — built with Next.js/TypeScript frontend, FastAPI/Python backend, LangGraph orchestration, and PostgreSQL + pgvector
Turns a complex PDF (contract, technical spec, report) into typed, evidence-backed analysis and grounded Q&A; a LangGraph workflow classifies each document and routes it to a contract, technical_specification, or generic extractor, with a bounded retry on validation failure
Every finding or answer must cite the page and quote it came from — citations are validated against retrieved context and source text before being shown, rather than trusted
Retrieval-augmented Q&A backed by pgvector, with a deterministic offline evaluation harness tracking retrieval and citation-validation quality
Live https://doculens.mathiashuque.dev/es

What I Bring to a Team

As a Software Engineer, I contribute across the stack — from idea to production.

Strengths:

* Full-stack web development (frontend + backend)
* Frontend UI development (React / Next.js / Angular) with a focus on performance and UX
* Backend engineering (Node.js / NestJS / .NET) — REST/GraphQL APIs, auth, business logic, integrations
* Database design and optimization (PostgreSQL, MySQL, MongoDB, SQL Server) and ORM-based development
* Architecture and refactoring (clean architecture, modularization, codebase cleanup, maintainability)
* Performance optimization (profiling, reducing bottlenecks, faster load times)
* Testing and quality (unit/e2e testing setups with Jest/Cypress, pragmatic test strategies)
* DevOps and deployment (Docker, CI/CD, cloud platforms, Linux environments)

I enjoy diving into ambiguous problems and iterating quickly toward a working solution.

Contact & Links

Website https://www.mathiashuque.dev

Email [contact@mathiashuque.dev](mailto:contact@mathiashuque.dev)

GitHub https://github.com/mathiashuque

LinkedIn https://www.linkedin.com/in/mathias-huque

CV (English) https://www.mathiashuque.dev/Mathias_Huque_CV_en.pdf
CV (Spanish) https://www.mathiashuque.dev/Mathias_Huque_CV_es.pdf

Preferred contact channels Email or LinkedIn

Interests (optional personal info)

Outside of coding, I’m a technology enthusiast who enjoys games and music.

* Gaming: I like shooters — Mass Effect and Counter-Strike are favorites.
* Music: Rock.
* Food: sushi, chocolate, and hamburgers.
* Not a fan of most fish or alcohol.

I’m also the kind of person who cares about the small details — clean code, smooth UX, and making things feel fast.

Support Topics

I can help with bug fixes, feature development, performance optimization, refactoring, testing setup, deployment, and improving existing codebases.

If something is outside my experience or I don’t have the details, I’ll be honest and say so.


`;
