const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const context = github.context;
    if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    }

// github.token ?
    const token = core.getInput('okami-token');
    const octokit = github.getOctokit(token);
    const prNumber = context.payload.pull_request.number;
    
    octokit.issues.createComment({
        ...context.repo,
        issue_number: prNumber,
        body: "Test"
      });
}

run();

/*
try {

};
} catch (error) {
  core.setFailed(error.message);
}
*/
