# TokenTrim

**AI context optimization layer for agentic applications.**

Trim unnecessary context before it reaches the model. Keep only what matters.

## Overview

TokenTrim is a conceptual developer-focused tool designed to help reduce unnecessary AI agent context.

It focuses on four core operations:

* **Manage** — Control what enters and stays in context.
* **Compress** — Reduce large content while preserving useful information.
* **Replace** — Swap expensive raw data for compact representations.
* **Eliminate** — Remove redundant, outdated, or low-value context.

This repository contains the **TokenTrim landing page**, built to present the product concept, developer workflow, SDK examples, analytics, integrations, and use cases.

> **Note:** TokenTrim is currently a conceptual project. The SDK examples, token counts, performance metrics, and analytics displayed on the landing page are illustrative demonstrations.

## Features

* Hero section with context optimization visualization
* Context bloat problem explanation
* Manage / Compress / Replace / Eliminate operations
* Interactive before-and-after context playground
* Developer SDK examples
* TypeScript, Python, and cURL examples
* Analytics and observability preview
* Integrations overview
* Developer-focused use cases
* FAQ section
* Responsive design
* Mobile navigation
* Theme support

## Tech Stack

* **React** — UI development
* **TypeScript** — Type safety
* **Vite** — Development and build tooling
* **Tailwind CSS** — Styling
* **shadcn/ui** — Reusable UI components
* **Recharts** — Analytics and data visualizations

## Getting Started

### Prerequisites

Make sure you have **Node.js** and a package manager such as pnpm, npm, or Bun installed.

### 1. Clone the repository

```bash
git clone https://github.com/jzzmiiinn/TokenTrim.git
cd TokenTrim
```

### 2. Install dependencies

Using pnpm:

```bash
pnpm install
```

Or npm:

```bash
npm install
```

Or Bun:

```bash
bun install
```

### 3. Start the development server

Using pnpm:

```bash
pnpm dev
```

Or npm:

```bash
npm run dev
```

Or Bun:

```bash
bun dev
```

The application will be available at:

```text
http://localhost:5173
```

### 4. Build for production

```bash
pnpm build
```

Or:

```bash
npm run build
```

Or:

```bash
bun run build
```

The production files are generated in the `dist/` directory.

## Project Structure

```text
TokenTrim/
├── public/
├── src/
│   ├── components/
│   │   ├── themes/
│   │   │   ├── active-theme.tsx
│   │   │   ├── font.config.ts
│   │   │   ├── theme-mode-toggle.tsx
│   │   │   ├── theme-provider.tsx
│   │   │   ├── theme-selector.tsx
│   │   │   └── theme.config.ts
│   │   ├── ui/
│   │   │   └── ...              # shadcn/ui components
│   │   ├── icons.tsx
│   │   ├── not-found.tsx
│   │   └── search-input.tsx
│   │
│   ├── features/
│   │   └── landing/
│   │       ├── components/
│   │       │   └── hero-section.tsx
│   │       └── landing-page.tsx
│   │
│   ├── lib/
│   │   ├── compose-refs.ts
│   │   ├── format.ts
│   │   ├── next-compat.tsx
│   │   ├── theme-transition.ts
│   │   └── utils.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── theme.css
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── dist/                         # Production build output
├── index.html
├── components.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── bun.lock
├── bunfig.toml
├── env.example.txt
├── LICENSE
└── README.md
```

### Key Directories

#### `src/components/`

Contains shared components used throughout the application.

* `ui/` — Reusable shadcn/ui components
* `themes/` — Theme configuration, theme provider, and theme controls
* `icons.tsx` — Custom icon components
* `search-input.tsx` — Search input component
* `not-found.tsx` — Not-found page component

#### `src/features/landing/`

Contains the main TokenTrim landing page.

```text
landing/
├── components/
│   └── hero-section.tsx
└── landing-page.tsx
```

The landing page is organized as a feature so that product-specific UI remains separate from shared components.

#### `src/lib/`

Contains reusable utilities and helper functions, including formatting, refs, theme transitions, and general utility functions.

#### `src/styles/`

Contains the application's global styles and theme styles.

#### `src/types/`

Contains shared TypeScript type definitions.

## Landing Page Sections

The TokenTrim landing page is structured around the developer's journey from understanding the problem to exploring the product.

### 1. Hero

Introduces TokenTrim and communicates its core value:

> Trim unnecessary context before it reaches the model.

The hero also includes a visual representation of context optimization.

### 2. The Problem

Explains the problem of **context bloat** in AI-powered applications, including unnecessary tool outputs, conversation history, documents, and retrieved information.

### 3. Core Operations

Introduces TokenTrim's four main operations:

| Operation     | Purpose                                                 |
| ------------- | ------------------------------------------------------- |
| **Manage**    | Control what enters and remains in context              |
| **Compress**  | Reduce content while preserving useful information      |
| **Replace**   | Replace expensive raw data with compact representations |
| **Eliminate** | Remove unnecessary or outdated context                  |

### 4. Before / After Playground

Demonstrates how raw AI context can be transformed into a smaller, more focused context.

### 5. Developer SDK

Provides conceptual examples showing how developers could integrate TokenTrim into their applications.

Examples include:

* TypeScript
* Python
* cURL

### 6. Analytics & Observability

Provides a conceptual preview of metrics that could help developers understand context usage and optimization.

### 7. Integrations

Highlights potential integrations with developer tools and AI application workflows.

### 8. Use Cases

Shows practical scenarios where context optimization could be useful for agentic applications.

### 9. FAQ

Answers common questions about TokenTrim and context optimization.

### 10. Footer

Provides navigation, project information, and relevant links.

## Conceptual Architecture

```text
AI Application
      │
      ▼
┌───────────────────┐
│     TokenTrim     │
├───────────────────┤
│      Manage       │
│      Compress     │
│      Replace      │
│      Eliminate    │
└───────────────────┘
      │
      ▼
Optimized AI Context
      │
      ▼
    AI Model
```

The concept is to optimize context **before unnecessary information reaches the model**.

## Development

Run the development server while making changes:

```bash
pnpm dev
```

Type-check the project:

```bash
pnpm exec tsc --noEmit
```

Build the project:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Important Notes

* TokenTrim is currently a **conceptual developer-tool project**.
* The landing page does not represent a production AI context optimization service.
* SDK code examples are demonstrations and are not currently connected to a working TokenTrim backend.
* Token counts, optimization percentages, analytics, and performance metrics shown in the UI are illustrative.
* The `dist/` directory contains generated production build files and should generally not be manually edited.

## Repository

GitHub repository:

**https://github.com/jzzmiiinn/TokenTrim**

## License

This project is licensed under the **MIT License**.
