import { exec } from 'child_process';
import { promisify } from 'util';
import readline from 'readline';

const execAsync = promisify(exec);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('🚀 Setting up GitHub Pages deployment...');
  
  // Instructions for creating token
  console.log('\n1. Go to https://github.com/settings/tokens');
  console.log('2. Click "Generate new token (classic)"');
  console.log('3. Note: "Portfolio Deployment"');
  console.log('4. Select scopes: repo, workflow');
  console.log('5. Click "Generate token"');
  console.log('6. Copy the generated token\n');
  
  const token = await question('Paste your GitHub token here: ');
  
  if (!token) {
    console.error('❌ Token is required');
    process.exit(1);
  }

  // Set up repository secrets
  console.log('\n📝 Setting up repository secrets...');
  
  const databaseUrl = 'postgresql://neondb_owner:npg_7KTiaqXyz5lf@ep-billowing-river-a7xr03pf-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
  
  try {
    // Set DATABASE_URL secret
    await execAsync(`gh auth login --with-token <<< "${token}"`);
    await execAsync(`gh secret set DATABASE_URL --body="${databaseUrl}"`);
    
    console.log('✅ Repository secrets set successfully');
    
    // Enable GitHub Pages
    console.log('\n🌐 Enabling GitHub Pages...');
    await execAsync('gh api -X PATCH repos/mirajuddin1357/miraj-portfolio/pages -f source="gh-pages" -f build_type="workflow"');
    
    console.log('\n✅ GitHub Pages enabled successfully');
    console.log('\n🎉 Setup complete! Your portfolio will be available at:');
    console.log('https://mirajuddin1357.github.io/miraj-portfolio');
    console.log('\nThe first deployment will start automatically.');
    console.log('You can check the progress at:');
    console.log('https://github.com/mirajuddin1357/miraj-portfolio/actions');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
