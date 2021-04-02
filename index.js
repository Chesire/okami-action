const core = require('@actions/core');
const github = require('@actions/github');

try {
  const context = github.context;
  if (context.payload.pull_request == null) {
      core.setFailed('No pull request found.');
      return;
  }

  const github_token = core.getInput('GITHUB_TOKEN');
  const octokit = new github.GitHub(github_token);
  
  const pull_request_number = context.payload.pull_request.number;

  // const octokit = github.getOctokit(github_token)
  const new_comment = octokit.issues.createComment({
    ...context.repo,
    issue_number: pull_request_number,
    body: "Test input"
  });
} catch (error) {
  core.setFailed(error.message);
}
