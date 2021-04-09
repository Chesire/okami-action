const core = require('@actions/core')
const github = require('@actions/github')
const apis = require('./apis')

async function run() {
    const context = github.context
    if (context.payload.pull_request == null) {
        console.error("Not currently running in a pull request")
        return
    }

    var animal = core.getInput('animal-type')
    const image = await apis.getAnimalImageUrl(animal)
    if (image === "") {
        core.setFailed("No image url found! Not posting a comment")
    } else {
        postImageToPR(context, image)
    }
}

async function postImageToPR(context, picture) {
    const token = core.getInput('okami-token')
    const octokit = github.getOctokit(token)
    const prNumber = context.payload.pull_request.number
    const commentBody = `![](${picture})`

    console.log("Posting comment " + commentBody)

    octokit.issues.createComment({
        ...context.repo,
        issue_number: prNumber,
        body: commentBody
    })

    console.log("Finished createComment")
}

run()
