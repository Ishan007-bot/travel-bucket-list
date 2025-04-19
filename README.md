# Travel Bucket List - Phase 2

This is a React application for creating and managing a travel bucket list. This repository currently contains the Phase 1 & 2 implementations.

## Current Implementation

### Phase 1: Project Setup & Foundation
- Initialized Vite React project
- Basic folder structure
- React Router setup
- Basic responsive layout template

### Phase 2: API Integration & Data Modeling
- REST Countries API integration
- API service functions for fetching countries
- Global state management with Context API
- Local storage persistence for saved countries
- Theme context for light/dark mode
- Data fetching hooks with loading states
- Utility functions for data formatting

## Features
- Light/Dark mode toggle
- Countries API integration
- State management with Context API
- Local storage for saving user preferences

## Folder Structure

- `src/components/` - For reusable UI components
- `src/pages/` - For route-specific components
- `src/context/` - For state management
- `src/api/` - For API service functions
- `src/utils/` - For utility functions
- `src/assets/` - For static resources
- `src/hooks/` - For custom hooks
- `src/themes/` - For theme configuration

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Next Steps

Refer to MASTER_PLAN.md for the full project roadmap and future phases.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
