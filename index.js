const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
    const context = github.context;
    if (context.payload.pull_request == null) {
        console.error("Not currently running in a pull request")
        return;
    }

    const image = await getImageUrl();
    console.log(`image url - ${image}`);
    postImageToPR(image)
}

async function getImageUrl() {
    var shibaUrl = ""
    try {
        const response = await axios.get("http://shibe.online/api/shibes")
        shibaUrl = response.data[0];
    } catch (error) {
        console.error(error);
    }

    return shibaUrl;
}

async function postImageToPR(picture) {
    const token = core.getInput('okami-token');
    const octokit = github.getOctokit(token);
    const prNumber = context.payload.pull_request.number;
    const commentBody = `![](${picture})`

    octokit.issues.createComment({
        ...context.repo,
        issue_number: prNumber,
        body: commentBody
    });
}

// /api/cats or birds at /api/birds
run();
