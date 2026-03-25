# SkinTerMo Web Application

A React-based web application for skin disease detection and analysis, part of the SkinTerMo ecosystem that includes mobile (Flutter) and backend (Python) components.

## Features

- **User Authentication**: Secure login/signup system with role-based access control
- **Multi-role Support**: 
  - Patient dashboard for personal health tracking
  - Doctor dashboard for medical analysis and patient management
  - Admin dashboard for system oversight
- **Skin Disease Analysis**: Integration with AI models for skin condition detection
- **Healthcare Chat**: AI-powered medical consultation interface
- **Analysis History**: Track and review previous skin analyses
- **Responsive Design**: Optimized for various screen sizes

## Project Structure

```
skin_termo_web/
├── public/                 # Static assets
├── src/
│   ├── App.jsx            # Main application component with routing
│   ├── index.css          # Global styles
│   ├── main.jsx           # Application entry point
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components organized by role
│   │   ├── Auth/          # Authentication pages (Login, Signup)
│   │   ├── Patient/       # Patient-specific pages
│   │   ├── Doctor/        # Doctor-specific pages
│   │   ├── Admin/         # Admin-specific pages
│   │   └── Landing/       # Public landing pages
│   ├── services/          # API service functions
│   └── assets/            # Images, icons, and other static resources
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
└── package.json           # Project dependencies and scripts
```

## Technology Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: CSS3
- **Routing**: React Router DOM
- **State Management**: React Context/Hooks
- **HTTP Client**: Fetch API/Axios (in services)
- **Development**: ESLint for code quality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd skin_termo_web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000/api  # Backend API URL
   ```

### Development Server

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## API Integration

The web application communicates with the SkinTerMo Python backend (`skin_termo_backend`) through RESTful API endpoints. Key service modules are located in `src/services/`:

- `authService.js` - Authentication endpoints
- `patientService.js` - Patient-specific endpoints
- `doctorService.js` - Doctor-specific endpoints
- `adminService.js` - Admin-specific endpoints
- `analysisService.js` - Skin analysis endpoints
- `chatService.js` - Healthcare chat endpoints

## Related Components

This web application is part of a larger SkinTerMo ecosystem:

1. **Mobile Application** (`skin_termo_ai/`): Flutter-based mobile app for on-the-go skin analysis
2. **Backend API** (`skin_termo_backend/`): Python/FastAPI server handling authentication, data storage, and AI model inference
3. **Web Application** (`skin_termo_web/`): React/Vite frontend for comprehensive dashboard experience

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or inquiries, please open an issue in the repository.
