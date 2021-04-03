const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

var animal = {
    shiba: "SHIBA",
    cat: "CAT",
    bird: "BIRD"
}

async function run() {
    const context = github.context;
    if (context.payload.pull_request == null) {
        console.error("Not currently running in a pull request")
        return;
    }

    const image = await getAnimalImageUrl();
    console.log(`image url - ${image}`);
    postImageToPR(context, image)
}

async function getAnimalImageUrl() {
    const animalInput = core.getInput('animal-type')
    const animalType = animalInput.toUpperCase()

    if (animalType == animal.shiba) {
        return getShibaImage()
    } else if (animalType == animal.cat) {
        return getCatImage()
    } else if (animalType == animal.bird) {
        return getBirdImage()
    } else {
        core.setFailed("Invalid animal input" + animalInput)
    }
}

async function getShibaImage() {
    var pictureUrl = ""
    try {
        const response = await axios.get("http://shibe.online/api/shibe")
        pictureUrl = response.data[0];
    } catch (error) {
        console.error(error);
    }

    return pictureUrl;
}

async function getCatImage() {
    var pictureUrl = ""
    try {
        const response = await axios.get("http://shibe.online/api/cats")
        pictureUrl = response.data[0];
    } catch (error) {
        console.error(error);
    }

    return pictureUrl;
}

async function getBirdImage() {
    var pictureUrl = ""
    try {
        const response = await axios.get("http://shibe.online/api/birds")
        pictureUrl = response.data[0];
    } catch (error) {
        console.error(error);
    }

    return pictureUrl;
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
