let elWrapper = document.querySelector('#user-wrapper')
let elPostResult = document.querySelector('#user-second')
let elCommitResult = document.querySelector('#user-third')


let elCountUser = document.querySelector("#count_user")
let elCountPosts = document.querySelector("#count_posts")
let elCountCommits = document.querySelector("#count_Com")



let ElTemplate = document.querySelector("#ListTemplate").content
let elPostTemplate = document.querySelector("#postemplate").content
let elCommentTemplate = document.querySelector("#commentTemplate").content


function render(array, wrapper) {

    let listItem = document.createDocumentFragment();

    if (array.length > 0) {
        array.forEach(function (item) {
            let listTemplatee = ElTemplate.cloneNode(true)
            console.log(item);


            listTemplatee.querySelector("#user-name").textContent = item.name;
            listTemplatee.querySelector("#user-name").dataset.userId = item.id;
            listTemplatee.querySelector("#user-email").textContent = "Email: " + item.email;
            listTemplatee.querySelector("#user-company").textContent = "Company: " + item.company.name;
            listTemplatee.querySelector("#user-country").textContent = "Country: " + item.address.city;
            listTemplatee.querySelector("#user-website").textContent = "Website: " + item.website;
            listItem.appendChild(listTemplatee)


        })
        wrapper.innerHTML = null
        wrapper.appendChild(listItem)
        console.log(array);
    } else {
        alert("malumot kelmadi")
    }

    elCountUser.textContent = "Users: " + array.length;

    
}

fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(response => response.json())
    .then( data => render(data, elWrapper))

function renderPosts(postsArray, postswrapper) {
    let posts = document.createDocumentFragment();
    if (postsArray) {
        postsArray.forEach(item => {



            let postsTemplate = elPostTemplate.cloneNode(true);
            postsTemplate.querySelector("#post-name").textContent = item.title;
            postsTemplate.querySelector("#post-text").textContent = "POSTS: " + item.body;
            postsTemplate.querySelector("#post-name").dataset.userId = item.id;
            posts.appendChild(postsTemplate);


        });
        postswrapper.innerHTML = null;
        postswrapper.appendChild(posts);
    } else {
        postswrapper.innerHTML = null;
    };
    elCountPosts.textContent = "Posts:" + postsArray.length;
};

elWrapper.addEventListener("click", (evt) => {
    let selectedUserId = evt.target.dataset.userId

    fetch(`https://jsonplaceholder.typicode.com/user/${selectedUserId}/posts`)
        .then(response => response.json())
        .then(json => renderPosts(json, elPostResult));
    commentsWrapper.innerHTML = null

});


function comment(array, wrapper) {
    let comments = document.createDocumentFragment();

    if (array) {
        array.forEach(item => {


            let templateComit = elCommentTemplate.cloneNode(true);
            templateComit.querySelector("#comName").textContent = "Title: " + item.name;
            templateComit.querySelector("#comEmail").textContent = "Email: " + item.email;
            templateComit.querySelector("#CommitThat").textContent = "COMMENT: " + item.body;
            comments.appendChild(templateComit);


            console.log(item);

            wrapper.innerHTML = null;
        });
        wrapper.appendChild(comments);
    } else {
        wrapper.innerHTML = null;
        alert("Malumot kelmadi!");
    };
    elCountCommits.textContent = "Comments:" + array.length ;
};

elPostResult.addEventListener("click", (evt) => {
    let selectedUserId = evt.target.dataset.userId

    fetch(`https://jsonplaceholder.typicode.com/posts/${selectedUserId}/comments`)
        .then(response => response.json())
        .then(json => comment(json, elCommitResult))
})