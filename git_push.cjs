const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const readline = require('readline');

const dir = 'c:/Users/LENOVO/Downloads/Sanjai_Portfolio';

// Simple recursive directory walker
function walk(currentDir, relativePath = '') {
  let results = [];
  const list = fs.readdirSync(currentDir);
  for (const file of list) {
    const filePath = path.join(currentDir, file);
    const relPath = relativePath ? `${relativePath}/${file}` : file;
    const stat = fs.statSync(filePath);

    // Skip git folder, node_modules, and dist
    if (file === '.git' || file === 'node_modules' || file === 'dist' || file === '.gemini' || file === '.agents') {
      continue;
    }
    // Skip environment files and logs
    if (file === '.env' || file === '.env.local' || file === '.env.production' || file.endsWith('.log')) {
      continue;
    }
    // Skip raw pictures just in case
    if (file === 'MyPic.jpeg' || file === 'Sanjai_Pic.jpeg' || file.startsWith('WhatsApp Image')) {
      continue;
    }

    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath, relPath));
    } else {
      results.push(relPath);
    }
  }
  return results;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  try {
    console.log('Initializing Git repository if not present...');
    if (!fs.existsSync(path.join(dir, '.git'))) {
      await git.init({ fs, dir });
      console.log('Git repository initialized.');
    } else {
      console.log('Git repository already initialized.');
    }

    // Add remote
    console.log('Setting up remote...');
    try {
      await git.addRemote({
        fs,
        dir,
        remote: 'origin',
        url: 'https://github.com/Sanjai-Quest/Backend-Portfolio.git'
      });
      console.log('Added remote origin.');
    } catch (err) {
      // Remote might already exist
      console.log('Remote origin setup checked.');
    }

    // Find and add files
    console.log('Scanning files...');
    const files = walk(dir);
    console.log(`Found ${files.length} files to add.`);

    for (const filepath of files) {
      await git.add({ fs, dir, filepath });
    }
    console.log('All files added to staging.');

    // Commit
    console.log('Creating commit...');
    let sha = await git.commit({
      fs,
      dir,
      author: {
        name: 'Sanjai L',
        email: 'sanjai@example.com'
      },
      message: 'Deploy: final production pass'
    });
    console.log(`Committed successfully. SHA: ${sha}`);

    // Prompt for credentials
    rl.question('Enter GitHub Username: ', (username) => {
      rl.question('Enter GitHub Personal Access Token (PAT): ', async (token) => {
        rl.close();
        
        console.log('Pushing to GitHub repository...');
        try {
          let pushResult = await git.push({
            fs,
            http,
            dir,
            remote: 'origin',
            ref: 'main',
            force: true, // Force push to override any mismatched histories
            onAuth: () => ({ username, password: token })
          });
          console.log('Push completed successfully!', pushResult);
        } catch (pushError) {
          console.error('Error during push:', pushError);
        }
      });
    });
  } catch (error) {
    console.error('An error occurred:', error);
    rl.close();
  }
}

main();
