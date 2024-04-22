const usernameheading = document.getElementById('usernameheading');

//******************************** Functions *****************************// 



function updateProfile(data) 
{
    // console.log(data);

    const login = data.login;
    const url = data.html_url;
    const avatar_url = data.avatar_url;
    const name = data.name;
    const followers = data.followers;
    const following = data.following;
    const public_repos = data.public_repos;

    document.getElementById('usernameheading').innerHTML = login;
    document.getElementById('avatarurl').src = avatar_url;
    document.getElementById('profileurl').href = url;
    document.getElementById('fullname').innerHTML = name;
    document.getElementById('repocount').innerHTML = public_repos;
    document.getElementById('followercount').innerHTML = followers;
    document.getElementById('followingcount').innerHTML = following;

}


function updateRepoList(data) 
{
    // console.log(data); // array format

    let size = data.length;

    if(size==0)
    {
        document.getElementById('repoList').innerHTML = `
        <h3 class="text-light text-center mb-5">User with username '${username1}' has not created any repository yet</h3>
        `;

        return;
    }

    // console.log(size);

    str=``;

    for(let i=0;i<size;i++)
    {
        currdata = data[i];

        console.log(currdata);

        str += `
        <div class="col mb-5 brad">
            <div class="card" id="rcard">
                <div class="card-body fs-4 position-relative">
                <h2 class="card-title text-center fs-3">
                    ${currdata.name ? currdata.name.slice(0,50):"Unnamed"}
                </h2>
                <hr />
                <p class="card-text">Description :</p>
                <p>
                ${currdata.description ? currdata.description.slice(0,50):currdata.name}
                </p>
                <p class="card-text">Created on : ${currdata.created_at}</p>
                <p class="card-text">Open Issues : ${currdata.open_issues}</p>


                <div class="position-absolute fixed-bottom pb-5">
                    <hr />
                    <div class="d-flex justify-content-around">
                    <a href="${currdata.created_at}" class="btn btn-primary fs-4">Visit Repository</a>
                    <a href="${currdata.homepage}" class="btn btn-success fs-4 ${!(currdata.homepage && currdata.homepage.length) ? "disabled" : "active"}">Visit Deployment</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
        `;
    }

    document.getElementById('repoList').innerHTML = str;


}


async function getRepoList(oldData) 
{
    // console.log(data);
    // const login = data.login;

    let repos_url = oldData.repos_url;

    let response = await fetch(repos_url);
    let data = await response.json()
    
    updateRepoList(data);
}

function uodateStatsCars(data) 
{
    // console.log(data);

    const login = data.login;

    document.getElementById('st1img').src = `https://github-readme-stats.vercel.app/api/top-langs?username=${login}&show_icons=true&locale=en&layout=compact&theme=radical`;


    document.getElementById('st2img').src = `https://github-readme-stats.vercel.app/api?username=${login}&show_icons=true&locale=en&theme=radical`;

    document.getElementById('st3img').src = `https://github-readme-streak-stats.herokuapp.com/?user=${login}&theme=radical`;

    document.getElementById('st4img').src = `https://github-readme-activity-graph.cyclic.app/graph?username=${login}&bg_color=0D1117&color=5BCDEC&line=5BCDEC&point=FFFFFF&hide_border=true`;


}






async function fetchDataFromApi(username) {
    let URL = `https://api.github.com/users/${username}`;

    const response = await fetch(URL);
    // waits until the request completes...
    const data = await response.json();

    if(data.message)
    {
        window.location.replace(`/github-wrapper-javascript/404.html`);
        // window.location.replace(`/404.html`);
    }

    updateProfile(data);
    getRepoList(data);
    uodateStatsCars(data);
}






function getUsernameFromUrl() {

    // http://127.0.0.1:5500/profile.html?Pratham2301

    let url = document.URL;
    let userid = url.split("profile.html?")[1];
    usernameheading.innerHTML = userid;
    return userid;
}

//******************************** Main Code *****************************// 


const username1 = getUsernameFromUrl();
// console.log(username1);
fetchDataFromApi(username1);
