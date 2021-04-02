const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');

async function run() {
    const context = github.context;
    if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    }

    const token = core.getInput('okami-token');
    const octokit = github.getOctokit(token);
    const prNumber = context.payload.pull_request.number;
    
    const picture = getShibaPicture()
    console.log(`picture data ${picture}`)

    const commentBody = `[shibe]{{$picture}}`

    octokit.issues.createComment({
        ...context.repo,
        issue_number: prNumber,
        body: commentBody
    });
}

async function getShibaPicture() {
    var result = '';
    const options = {
        hostname: 'shibe.online',
        path: '/api/shibes',
        method: 'GET'
    }
// http://shibe.online/api/shibes?urls=[true/false]

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            result += d
        })
        res.on('error', error => {
            console.log(`error occurred: ${error}`)
        })
        res.on('end', () => {
            console.log(`ended ${result}`)
        })
    })

    req.end()
    return result
}


// /api/cats or birds at /api/birds
run();

/*
try {

};
} catch (error) {
  core.setFailed(error.message);
}
*/
