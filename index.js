const core = require('@actions/core')
const github = require('@actions/github')
const apis = require('./apis')

const actionTag = "<!--okami-action-->"

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
    const shouldUpdateImage = core.getInput('update-image')
    const octokit = github.getOctokit(token)
    const commentBody = `${actionTag}\n![](${picture})`
    const prNumber = context.payload.pull_request.number

    const commentsResponse = await octokit.issues.listComments({
        ...context.repo,
        issue_number: prNumber
    })
    const findResult = commentsResponse.data.find(element => element.body.includes(actionTag))

    if (shouldUpdateImage && findResult != undefined) {
        console.log("Updating comment with: " + commentBody)
        await octokit.issues.updateComment({
            ...context.repo,
            comment_id: findResult.id,
            body: commentBody
        })
        console.log("Finished updateComment")
    } else {
        console.log("Creating comment with: " + commentBody)
        await octokit.issues.createComment({
            ...context.repo,
            issue_number: prNumber,
            body: commentBody
        })
        console.log("Finished createComment")
    }
}

run()
