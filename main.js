const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

try {
  const base64EncodedSecret = core.getInput('base64-encoded-secret');
  let base64DecodedSecret = Buffer.from(base64EncodedSecret, 'base64');
  const filename = core.getInput('filename');
  const isExceutable = String(core.getInput('is-executable')) == "true";
  const workingDirectory = core.getInput('working-directory');
  const filePath = path.join(workingDirectory, filename);

  if (!fs.existsSync(workingDirectory)){
    fs.mkdirSync(workingDirectory, { recursive: true });
  }

  fs.writeFileSync(filePath, base64DecodedSecret);

  if (isExceutable) {
    fs.chmodSync(filePath, "755");
  }
  
  console.log(`${filePath} created!`);
} catch (error) {
  core.setFailed(error.message);
}
