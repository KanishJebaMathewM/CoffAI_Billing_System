# CoffAI ☕

**AI-Assisted Coffee Billing System**

A modern, intuitive coffee shop billing system built with React and TypeScript. CoffAI streamlines the ordering process with intelligent discount calculations, customizable menu management, and professional bill generation.

🌐 **Live Demo**: [https://coffai.netlify.app/](https://coffai.netlify.app/)

## ✨ Features

- **Interactive Order Dashboard**: Easy-to-use interface for creating coffee orders
- **Dynamic Menu Management**: Add, remove, and customize coffee types, milk options, and add-ons
- **Smart Discount System**: Automatic bulk order discounts with configurable rules
- **Professional Bill Generation**: Generate and download PDF bills with AI-powered summaries
- **Customer Management**: Optional customer information collection
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Calculations**: Live order totals and discount applications

## 🚀 Tech Stack

### Frontend Framework
- **React** (v18.3.1) - Modern UI library with JSX/TSX support
- **TypeScript** - Type-safe JavaScript development

### Build & Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **typescript-eslint** - TypeScript-specific linting rules

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefix handling
- **lucide-react** - Beautiful, customizable icons

### PDF Generation
- **jsPDF** - Client-side PDF generation
- **html2canvas** - HTML to canvas conversion for PDF creation

### Deployment
- **Netlify** - Continuous deployment and hosting

## 📁 Project Structure

```
coffai/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── BillView.tsx          # Final bill display and PDF generation
│   │   ├── CustomerForm.tsx      # Customer information input modal
│   │   ├── Dashboard.tsx         # Main ordering interface
│   │   ├── Header.tsx            # Application header with branding
│   │   ├── ManagementCenter.tsx  # Menu and discount management
│   │   ├── MilkTypeManager.tsx   # Milk type management (legacy)
│   │   └── OrderSummary.tsx      # Order items and totals display
│   ├── hooks/
│   │   └── useStore.ts           # Global state management hook
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── utils/
│   │   └── pdfGenerator.ts       # PDF generation utilities
│   ├── App.tsx                   # Main application component
│   ├── index.css                 # Global styles and Tailwind imports
│   ├── main.tsx                  # Application entry point
│   └── vite-env.d.ts            # Vite environment types
├── .bolt/                        # Bolt configuration (development)
├── .gitignore                    # Git ignore rules
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── package-lock.json            # Dependency lock file
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # App-specific TypeScript config
├── tsconfig.node.json           # Node-specific TypeScript config
├── vite.config.ts               # Vite build configuration
└── README.md                    # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coffai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint code analysis
- `npm run preview` - Preview production build locally

## 🏗️ Architecture Overview

### State Management
The application uses a custom React hook (`useStore`) for centralized state management, handling:
- Menu items (coffee types, milk types, add-ons)
- Discount rules and calculations
- Current order state
- Customer information
- Bill generation

### Component Structure
- **App.tsx**: Main application router and state provider
- **Dashboard**: Order creation interface with item selection
- **OrderSummary**: Real-time order totals and item management
- **ManagementCenter**: Administrative interface for menu management
- **BillView**: Final bill display with PDF generation capabilities

### Type Safety
Comprehensive TypeScript definitions ensure type safety across:
- Menu items and pricing
- Order calculations
- Customer data
- Discount rules
- Bill generation

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Responsive Design**: Optimized for all screen sizes
- **Interactive Elements**: Hover states, transitions, and micro-interactions
- **Color System**: Amber/orange theme representing coffee warmth
- **Typography**: Clear hierarchy with appropriate font weights
- **Accessibility**: Proper contrast ratios and semantic HTML

## 🔧 Configuration Files

### TypeScript Configuration
- `tsconfig.json` - Main TypeScript configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js environment settings

### Build Configuration
- `vite.config.ts` - Vite build tool configuration
- `postcss.config.js` - PostCSS processing setup
- `tailwind.config.js` - Tailwind CSS customization

### Code Quality
- `eslint.config.js` - ESLint rules and TypeScript integration

## 📱 Features in Detail

### Order Management
- Select coffee types with real-time pricing
- Choose milk alternatives with additional costs
- Add multiple add-ons (syrups, toppings, etc.)
- Adjust quantities with intuitive controls
- Remove items from order

### Discount System
- Configurable bulk order discounts
- Automatic application based on quantity thresholds
- Visual feedback for applied discounts
- Savings calculation and display

### Bill Generation
- Professional PDF generation
- AI-powered order summaries
- Customer information inclusion
- Itemized pricing breakdown
- Discount details and savings

### Management Interface
- Add/remove coffee types and pricing
- Manage milk alternatives
- Configure add-ons and extras
- Set up discount rules
- Toggle discount rule activation

## 🚀 Deployment

The application is deployed on Netlify with automatic builds from the main branch.

**Live URL**: [https://coffai.netlify.app/](https://coffai.netlify.app/)

### Build Process
```bash
npm run build
```
Generates optimized production files in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern React and TypeScript
- Styled with Tailwind CSS for rapid development
- Icons provided by Lucide React
- PDF generation powered by jsPDF and html2canvas
- Deployed on Netlify for reliable hosting

---

**CoffAI** - Making coffee ordering smarter, one cup at a time! ☕✨