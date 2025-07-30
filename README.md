# Miraj Ud Din - Portfolio Website

A modern, professional portfolio website built with React, TypeScript, and Express.js featuring glassmorphism design, dark/light mode, and database integration.

## 🚀 Features

- ✨ Modern glassmorphism design with dark/light mode
- 📱 Fully responsive layout
- 🖼️ Professional profile photo integration
- 📊 Visitor tracking and analytics
- 📝 Contact form with database storage
- 🎯 Project showcase with technology tags
- 🏆 Certificates and achievements section
- 📄 Resume/CV section
- 🎨 Smooth animations and transitions

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Radix UI + shadcn/ui components
- Vite for build tooling
- TanStack Query for state management

**Backend:**
- Express.js with TypeScript
- PostgreSQL with Drizzle ORM
- Session management
- RESTful API endpoints

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (local or cloud)

## 🔧 Installation & Setup

### 1. Clone/Download the Project
```bash
# If downloaded as ZIP, extract and navigate to folder
cd miraj-portfolio-complete
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=development
```

### 4. Database Setup
```bash
# Push database schema
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configs
│   │   └── pages/          # Page components
│   └── index.html
├── server/                 # Express backend
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database operations
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema
├── attached_assets/        # Static assets
│   └── my_profile_*.jpg    # Profile photo
└── package.json
```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start dev server (frontend + backend)

# Database
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Drizzle Studio (database GUI)

# Build
npm run build        # Build for production
npm start            # Start production server
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following tables:
- `users` - User accounts
- `contact_messages` - Contact form submissions
- `visitors` - Visitor tracking data
- `page_views` - Page view analytics

## 🔧 VS Code Setup

### Recommended Extensions:
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Prettier - Code formatter

### VS Code Settings:
Create `.vscode/settings.json`:
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add DATABASE_URL environment variable
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure serverless functions for API

### Railway
1. Connect GitHub repository
2. Add PostgreSQL service
3. Set environment variables
4. Deploy automatically

## 🎨 Customization

### Colors & Theme
Edit `client/src/index.css` to modify the color scheme and glassmorphism effects.

### Content
- Update personal information in `client/src/components/about-section.tsx`
- Modify projects in `client/src/components/projects-section.tsx`
- Edit skills in `client/src/components/skills-section.tsx`
- Update certificates in `client/src/components/certificates-section.tsx`

### Profile Photo
Replace `attached_assets/my_profile_*.jpg` with your photo and update the import path.

## 📞 Contact

**Miraj Ud Din**
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

## 📄 License

This project is open source and available under the [MIT License](LICENSE).