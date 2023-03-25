const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

try {
  const filename = core.getInput('filename');
  const workingDirectory = core.getInput('working-directory');
  const filePath = path.join(workingDirectory, filename);

  fs.rmSync(filePath, { force: true });
  console.log(`${filePath} deleted!`);
} catch (error) {
  core.setFailed(error.message);
}
