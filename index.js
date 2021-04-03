const core = require('@actions/core')
const github = require('@actions/github')
const axios = require('axios')

var animal = {
    shiba: "SHIBA",
    cat: "CAT",
    bird: "BIRD",
    fox: "FOX",
    dog: "DOG"
}

async function run() {
    const context = github.context
    if (context.payload.pull_request == null) {
        console.error("Not currently running in a pull request")
        return
    }

    const image = await getAnimalImageUrl()
    if (image === "") {
        console.error("No image url found! Not posting a comment")
    } else {
        console.log(`image url - ${image}`)
        postImageToPR(context, image)
    }
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
    } else if (animalType == animal.fox) {
        return getFoxImage()
    } else if (animalType == animal.dog) {
        return getDogImage()
    } else {
        core.setFailed("Invalid animal input" + animalInput)
    }
}

async function getShibaImage() {
    return getShibeOnlineImage("shibes")
}

async function getCatImage() {
    return getShibeOnlineImage("cats")
}

async function getBirdImage() {
    return getShibeOnlineImage("birds")
}

async function getShibeOnlineImage(param) {
    var pictureUrl = ""
    try {
        const response = await axios.get("http://shibe.online/api/" + param)
        pictureUrl = response.data[0]
    } catch (error) {
        console.error(error)
    }

    return pictureUrl
}

async function getFoxImage() {
    var pictureUrl = ""
    try {
        const response = await axios.get("https://randomfox.ca/floof/")
        pictureUrl = response.data.image
    } catch (error) {
        console.error(error)
    }

    return pictureUrl
}

async function getDogImage() {
    var pictureUrl = ""
    try {
        const response = await axios.get("https://dog.ceo/api/breeds/image/random")
        pictureUrl = response.data.message
    } catch (error) {
        console.error(error)
    }

    return pictureUrl
}

async function postImageToPR(context, picture) {
    const token = core.getInput('okami-token')
    const octokit = github.getOctokit(token)
    const prNumber = context.payload.pull_request.number
    const commentBody = `![](${picture})`

    octokit.issues.createComment({
        ...context.repo,
        issue_number: prNumber,
        body: commentBody
    })

    console.log("Finished createComment")
}

run()
