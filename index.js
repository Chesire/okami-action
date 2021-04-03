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
    postImageToPR(context, image)
}

async function getImageUrl() {
    const url = getAnimalUrl()
    var pictureUrl = ""
    try {
        const response = await axios.get(url)
        pictureUrl = response.data[0];
    } catch (error) {
        console.error(error);
    }

    return pictureUrl;
}

function getAnimalUrl() {
    const animalInput = core.getInput('animal-type')
    const animalType = animalInput.toUpperCase()
    if (animalType == "shiba".toUpperCase()) {
        return "http://shibe.online/api/shibes"
    } else if (animalType == "cat".toUpperCase()) {
        return "http://shibe.online/api/cats"
    } else if (animalType == "bird".toUpperCase()) {
        return "http://shibe.online/api/birds"
    } else {
        core.setFailed("Invalid animal input" + animalInput)
    }
}

async function postImageToPR(context, picture) {
    const token = core.getInput('okami-token');
    const octokit = github.getOctokit(token);
    const prNumber = context.payload.pull_request.number;
    const commentBody = `![](${picture})`

    octokit.issues.createComment({
        ...context.repo,
        issue_number: prNumber,
        body: commentBody
    });

    console.log("Finished createComment")
}

run();
