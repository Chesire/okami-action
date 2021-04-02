const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const context = github.context;
    if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    }

    const githubToken = core.getInput('GITHUB_TOKEN');
    const octokit = github.getOctokit(githubToken);
    const prNumber = context.payload.pull_request.number;
    
    console.log(pullRequest);
    // octokit.rest.pulls.createReviewComment({
    octokit.pulls.createReviewComment({
        //...context.owner,
        ...context.repo,
        pull_number: prNumber,
        body: "Test",
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
