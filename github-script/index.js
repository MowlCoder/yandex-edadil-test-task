const queryString = 'q=' + encodeURIComponent('Yandex');

async function fetchRepos() {
    const response = await fetch('https://api.github.com/search/repositories?q=Yandex+in:name&sort=stars&order=desc');
    const data = await response.json();

    if (data && data.items) {
        return data.items
    }

    return null;
}

async function parseRepos(repos) {
    return repos.map((r) => ({
        name: r.full_name,
        url: r.html_url,
        starsCount: r.stargazers_count
    }));
}

async function reposToJSON(parsedRepos) {
    return JSON.stringify(parsedRepos);
}

function displayJSONValue(json) {
    const block = document.createElement('p');
    block.innerHTML = `${json} <br /><hr />`;
    document.body.appendChild(block);
}

function reposToHTML(parsedRepos) {
    parsedRepos.forEach((r) => {
        const block = document.createElement('div');

        block.innerHTML = `
            <p>Name: ${r.name}</p>
            <p>URL: ${r.url}</p>
            <p>Stars: ${r.starsCount}</p>
            <hr />
        `

        document.body.appendChild(block);
    });
}

async function buildReposList() {
    const repos = await fetchRepos();
    const parsedRepos = await parseRepos(repos);
    const parsedReposJSON = await reposToJSON(parsedRepos);

    displayJSONValue(parsedReposJSON);
    reposToHTML(parsedRepos);

    console.log(parsedReposJSON)
}

buildReposList();
