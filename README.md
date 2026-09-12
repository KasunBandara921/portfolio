# Kasun Bandara — Personal Developer Portfolio

A modern, high-performance developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed with dark/light mode themes, glassmorphic UI elements, interactive micro-animations, and a keyboard-driven command palette.

---

## ✨ Features

- ⚡ **Cinematic Preloader**: Dynamic initial load sequence featuring animated greetings, real-time progress counter, and a smooth curtain reveal.
- 🎨 **Theme Engine (Dark / Light)**: Seamless dark & light mode switcher with persistent localStorage state and zero flash of unstyled content (FOUC).
- ⌨️ **Command Palette (`Ctrl + K` / `Cmd + K`)**: Fast, keyboard-driven navigation to search sections, jump to projects, copy contact details, or switch themes.
- 🚀 **Featured Projects Carousel**: Interactive project showcase featuring tech stack pills with custom SVG icons, GitHub repositories, and live links.
- 📡 **Live Status & Activity**: Real-time activity radar beacon showcasing current engineering pursuits, AI integrations, and learning goals.
- 🔄 **Skills Infinite Marquee**: Seamless looping marquee showcasing core full-stack technologies (Next.js, Spring Boot, PostgreSQL, AWS, Docker, Java, TypeScript).
- ✍️ **Articles & Medium Publications**: Integrated blog cards linking directly to technical deep dives and tutorials.
- 📬 **Interactive Contact Form**: Integrated with EmailJS for serverless client-side email delivery, direct clipboard copy actions, and social profiles.
- 🎯 **Aesthetic Micro-Interactions**: Custom fine-pointer cursor, scroll progress bar, smooth scroll wheel, and scroll-triggered animations.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4, Vanilla CSS Design System |
| **Animations** | Framer Motion |
| **Icons** | Lucide React, React Icons (`fa6`, `si`, `tb`) |
| **Email Service** | EmailJS (`@emailjs/browser`) |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```bash
portfolio/
├── public/                # Static assets, images, project previews
├── src/
│   ├── app/
│   │   ├── api/           # API routes (e.g. contact fallback)
│   │   ├── globals.css    # Design tokens, themes, global CSS
│   │   ├── layout.tsx     # Root layout with preloader & global overlays
│   │   ├── loading.tsx    # Next.js Suspense streaming fallback
│   │   └── page.tsx       # Main single-page portfolio layout
│   ├── components/
│   │   ├── About.tsx          # About me & live activity cards
│   │   ├── Blogs.tsx          # Medium articles section
│   │   ├── CommandPalette.tsx # Global Cmd+K launcher
│   │   ├── Contact.tsx        # Contact form & social cards
│   │   ├── CustomCursor.tsx   # Custom magnetic cursor
│   │   ├── Footer.tsx         # Stylized banner, socials, and copyright
│   │   ├── Hero.tsx           # Full-screen hero section
│   │   ├── Milestones.tsx     # Academic and career journey
│   │   ├── Navbar.tsx         # Navigation header with theme switch
│   │   ├── Preloader.tsx      # Initial load screen & counter
│   │   ├── Projects.tsx       # Interactive project carousel
│   │   ├── ScrollProgress.tsx # Top scroll progress bar
│   │   ├── ScrollWheel.tsx    # Floating scroll indicator
│   │   └── Skills.tsx         # Technical skills marquee
│   └── data/
│       └── portfolio.json # Centralized data (skills, projects, socials, blogs)
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.18 or later
- **npm**, **pnpm**, or **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/KasunBandara921/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add your **EmailJS** credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_service_id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_template_id"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_public_key"
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for production

```bash
npm run build
npm run start
```

---

## 👤 Author

**Kasun Bandara**
- **GitHub**: [@KasunBandara921](https://github.com/KasunBandara921)
- **LinkedIn**: [Kasun Bandara](https://www.linkedin.com/in/kasun-bandara)
- **Medium**: [@kasunbandara_56722](https://medium.com/@kasunbandara_56722)
- **Email**: [bandarakasun495@gmail.com](mailto:bandarakasun495@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).