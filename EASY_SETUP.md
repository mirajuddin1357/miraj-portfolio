# Easy Setup - Run Portfolio in Browser

## Option 1: GitHub Codespaces (Recommended - Completely Free)

### Step 1: Upload to GitHub
1. Go to https://github.com and create a free account
2. Click "New repository"
3. Name it "miraj-portfolio"
4. Upload your ZIP file contents or drag and drop files

### Step 2: Open in Codespaces
1. On your GitHub repository page, click the green "Code" button
2. Select "Codespaces" tab
3. Click "Create codespace on main"
4. Wait for it to load (takes 1-2 minutes)

### Step 3: Run Your Portfolio
In the Codespaces terminal (automatically opens), run:
```bash
npm install
cp .env.example .env
npm run dev
```

Your portfolio will open automatically in a browser tab!

## Option 2: StackBlitz (Instant - No Setup)

### Step 1: Go to StackBlitz
1. Visit https://stackblitz.com
2. Click "Create Project" → "Node.js"

### Step 2: Upload Your Code
1. Delete the default files
2. Upload your portfolio files from the ZIP
3. StackBlitz automatically installs dependencies

### Step 3: Add Environment
1. Create `.env` file in StackBlitz
2. Add: `DATABASE_URL=your_database_url`
3. Your portfolio runs automatically!

## Option 3: CodeSandbox (Easy Upload)

### Step 1: Upload ZIP
1. Go to https://codesandbox.io
2. Click "Create" → "Import Project"
3. Upload your ZIP file
4. CodeSandbox sets up everything automatically

### Step 2: Configure
1. Add `.env` file with your database URL
2. Your portfolio runs in the browser instantly

## Database Options (Free)

For any of these methods, you need a database URL:

### Neon (Recommended - Free PostgreSQL)
1. Go to https://neon.tech
2. Create free account
3. Create database
4. Copy connection string to `.env`

### Supabase (Alternative)
1. Go to https://supabase.com
2. Create project
3. Get database URL from settings
4. Add to `.env` file

## No Downloads, No Installation Required!

All these options run completely in your browser:
- VS Code interface in the browser
- Your portfolio running live
- Full database integration
- Real-time development

**Recommended**: GitHub Codespaces gives you the full VS Code experience in your browser with Edge, completely free, and no local installation needed!