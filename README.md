# Countries Information Dashboard with Infinite Scroll

## Overview

A modern web application built with Next.js 14 that allows users to explore countries worldwide through an intuitive interface.

The application features infinite scroll functionality, search, and filtering capabilities.

### Features

- View all countries with infinite scroll pagination
- Search countries by name in real-time
- Filter countries by region
- Detailed country information pages
- Border country navigation
- Dark/Light theme toggle
- Responsive design for all devices
- Server-side rendering for optimal performance
- Automatic data revalidation

### Screenshot Preview

![](./screenshot.png)

### Live Demo

[View Live Site](https://countries.adamrichardturner.dev)

### Technical Stack

#### Frontend Framework

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety and developer experience

#### State Management & Data Fetching

- [SWR](https://swr.vercel.app/) - React Hooks for data fetching
- Server Components and Client Components

#### Styling & UI

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Accessible component system
- [Framer Motion](https://www.framer.com/motion/) - Animation library

#### Performance Features

- Intersection Observer API for infinite scroll
- Lazy loading
- Automatic data caching
- Responsive design patterns

### Key Implementation Details

- Custom hooks for data fetching and state management
- Optimized infinite scroll implementation
- Debounced search functionality
- Responsive grid layout system
- Theme persistence
- Error boundary implementation
- Loading state management

### Local Development

1. Clone the repository

```bash
git clone https://github.com/adamrichardturner/countries
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

### Author

**Adam Richard Turner**

- Portfolio: [adamrichardturner.dev](https://adamrichardturner.dev)
- GitHub: [@adamrichardturner](https://github.com/adamrichardturner)
- LinkedIn: [Adam Richard Turner](https://linkedin.com/in/adamrichardturner88)
