const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const usernameh1 = document.getElementById('usernameh1');

searchBtn.addEventListener("click", getDetails);
searchBox.onfocus = () => {
    setInterval(() => {
        let username = searchBox.value;

        if (username.length > 2) {
            console.log("active button");
            searchBtn.disabled = false;
        }
        else {
            console.log("disable button");
            searchBtn.disabled = true;
        }
    }, 1000);
};

function getDetails()
{
    const githubUsername = searchBox.value;
    
    console.log(githubUsername);

    window.location.replace(`/github-wrapper-javascript/profile.html?${githubUsername}`);
    // window.location.replace(`/profile.html?${githubUsername}`);
    
}


searchBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        // event.preventDefault();
        // Trigger the button element with a click
        searchBtn.click();
    }
});





// function myFunction(x) 
// {
//     if (x.matches) 
//     { // If media query matches
//         var element = document.getElementById("left-side");
//         element.classList.remove("w-75");
//         element.classList.add("w-100");

//         var element = document.getElementById("right-side");
//         element.classList.remove("w-25");
//         element.classList.add("w-100");
//     } 
//     else 
//     {
//         document.body.style.backgroundColor = "pink";
//     }
// }


// var x = window.matchMedia("(max-width: 700px)")
// myFunction(x) // Call listener function at run time
// x.addEventListener(myFunction)