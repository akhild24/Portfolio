# Portfolio Website

A modern portfolio website built with **React**, **Tailwind CSS**, and **Vite**.

## Project Structure

```
portfolio-website/
├── src/
│   ├── main.jsx          # Application entry point
│   ├── App.jsx           # Main application component
│   ├── App.css           # Component-specific styles
│   └── index.css         # Global styles (Tailwind directives)
├── index.html            # HTML template
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── .gitignore            # Git ignore rules
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

Install project dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:3000` in your default browser.

### Build

Build the project for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Technologies

- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next-generation build tool
- **PostCSS** - CSS transformation tool
- **Autoprefixer** - Vendor prefix automation

## Features

- ⚡ Fast development experience with Vite hot module replacement
- 🎨 Tailwind CSS for rapid UI development
- 📱 Responsive design out of the box
- 🚀 Optimized production build
- 🔧 Modern component-based architecture

## Customization

### Modify Tailwind Configuration

Edit `tailwind.config.js` to customize colors, spacing, and other design tokens.

### Add React Components

Create new `.jsx` files in the `src/` directory for additional components.

### Update Vite Configuration

Modify `vite.config.js` to customize build settings or add plugins.

## Next Steps

1. Replace the placeholder content in `src/App.jsx` with your portfolio components
2. Customize colors and theme in `tailwind.config.js`
3. Add your portfolio sections (about, projects, skills, contact, etc.)
4. Deploy to your hosting platform

## License

MIT
