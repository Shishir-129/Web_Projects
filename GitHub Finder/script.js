/* get DOM elements */

const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");
const errorContainer = document.getElementById("error-container");
const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");
const bioElement = document.getElementById("bio");
const locationElement = document.getElementById("location");
const joinedDateElement = document.getElementById("joined-date");
const profileLink = document.getElementById("profile-link");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");
const twitterElement = document.getElementById("twitter");
const companyContainer = document.getElementById("company-container");
const blogContainer = document.getElementById("blog-container");
const twitterContainer = document.getElementById("twitter-container");
const reposContainer = document.getElementById("repos-container");

searchBtn.addEventListener("click",searchUser);
/* Allow search on pressing Enter key */
searchInput.addEventListener("keypress",(event)=>{
    if(event.key === "Enter") searchUser();
});

async function searchUser(){
    const username = searchInput.value.trim();
    
    if (!username) return alert("Please enter a GitHub username.");

    try {
        //reset the ui
        profileContainer.classList.add("hidden");
        errorContainer.classList.add("hidden");

        const response = await fetch(`https://api.github.com/users/${username}`);

        if(!response.ok) throw new Error("User not Found");

        const userData = await response.json();
        console.log("User Data is here", userData);

        displayUserData(userData);

        fetchRepositories(userData.repos_url);

    } catch(error) {
        showError();
    }
}

async function fetchRepositories(reposurl){
    reposContainer.innerHTML = `<div class="loading-repos">Loading Repositories...</div>`;

    try{
        const response = await fetch(reposurl + "?per_page=6");
        const repos = await response.json();
        displayRepos(repos);
    } catch(error){
        reposContainer.innerHTML = `<div class="no-repos">${error.message}</div>`;
    }
}

function displayRepos(repos){
    if(repos.length === 0) {
        reposContainer.innerHTML = `<div class="no-repos">No repositories found </div>`;
        return;
    }

    reposContainer.innerHTML = ""; // Clear loading message

    repos.forEach(repo => {
        const repoCard = document.createElement("div");
        repoCard.className = "repo-card";

        const updatedAt = formatDate(repo.updated_at);

        repoCard.innerHTML = `
            <a href="${repo.html_url}" target="_blank" class="repo-name">
            <i class="fas fa-code-branch"></i> ${repo.name}
            </a>
            <p class="repo-description">${repo.description || "No description available"}</p>
            <div class="repo-meta">
                ${repo.language
                        ? `
                <div class="repo-meta-item">
                <i class="fas fa-circle"></i> ${repo.language}
                </div>
                `
                    : ""
                    }
                <div class="repo-meta-item">
                    <i class="fas fa-star"></i> ${repo.stargazers_count}
                </div>
                <div class="repo-meta-item">
                    <i class="fas fa-code-fork"></i> ${repo.forks_count}
                </div>
                <div class="repo-meta-item">
                    <i class="fas fa-history"></i> ${updatedAt}
                </div>
            </div>
        `;

        reposContainer.appendChild(repoCard);
    });
}

function displayUserData(user){
    avatar.src = user.avatar_url;
    nameElement.textContent = user.name || user.login;
    usernameElement.textContent = `@${user.login}`;
    bioElement.textContent = user.bio || "No bio available";

    locationElement.textContent = user.location || "Not specified";
    joinedDateElement.textContent = formatDate(user.created_at);

    profileLink.href = user.html_url;
    followers.textContent = user.followers;
    following.textContent = user.following;
    repos.textContent = user.public_repos;

    if(user.company){
        companyElement.textContent = user.company;
    }else{
        companyElement.textContent = "Not specified";
    }

    if (user.blog){
        blogElement.textContent = user.blog;
        blogElement.href = user.blog.startsWith("http") ? user.blog : `http://${user.blog}`;
    }else{
        blogElement.textContent = "Not specified";
        blogElement.href = "#"; // # means no link
    }

    blogContainer.style.display = "flex";

    if (user.twitter_username){
        twitterElement.textContent = `@${user.twitter_username}`;
        twitterElement.href = `https://twitter.com/${user.twitter_username}`;
    }else{
        twitterElement.textContent = "No Twitter / X";
        twitterElement.href = "#";
    }

    twitterContainer.style.display = "flex";

    profileContainer.classList.remove("hidden"); // Show profile container

}

function showError(){
    errorContainer.classList.remove("hidden"); // Show error message
    profileContainer.classList.add("hidden"); // Hide profile container
}

function formatDate(dateString){
    return new Date(dateString).toLocaleDateString("en-US",{
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

searchInput.value = "Shishir-129";
searchUser();