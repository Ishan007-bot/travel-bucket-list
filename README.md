# Travel Bucket List - Phase 4

This is a React application for creating and managing a travel bucket list. This repository currently contains Phases 1-4 implementations.

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

### Phase 3: Enhanced UI Components
- Responsive Navbar with mobile menu and search functionality
- Feature-rich Footer with quick links, resources, and social media
- Country card component with hover effects and interactive elements
- Reusable UI components:
  - Button component with multiple variants
  - Form inputs with validation
  - Loading spinners and loaders
  - Modal dialogs and confirm modals
- Complete dark/light theme implementation

### Phase 4: Home Page & Country List
- Implemented Home page with country list view
- Added hero section with search functionality
- Created grid/list toggle view with smooth transitions
- Implemented advanced filtering options:
  - Region filter
  - Population range filter
- Added sorting functionality (alphabetical, population)
- Implemented responsive design with different grid layouts
- Added pagination for country results
- Integrated search functionality with URL parameters
- Enhanced mobile responsiveness for all filters and views

## Features
- Light/Dark mode toggle
- Countries API integration
- State management with Context API
- Local storage for saving user preferences
- Responsive design for all screen sizes
- Reusable component library
- Advanced filtering and sorting
- Grid/List view toggle
- Pagination
- URL-based search

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
