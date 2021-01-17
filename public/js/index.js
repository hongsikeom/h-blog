import '@babel/polyfill';
import { createPost, updatePost, removePost } from './postHandler.js';
import { login } from './login';


const searchForm = document.getElementById('search-post');
const newPostForm = document.getElementById('new-post-form');
const loginForm = document.getElementById('login-form');
const currentPost = document.getElementById('currentPost');
const editPost = document.getElementById('editPost');


if (searchForm) {
    searchForm.addEventListener('click', e => {
        e.preventDefault();
        const input = document.getElementById('search-input').value.toLowerCase();
        const posts = document.getElementsByClassName('post');

        for (i = 0; i < posts.length; i++) {
            posts[i].firstElementChild.innerHTML.toLowerCase() === input
                ? posts[i].style.display = "inline-block"
                : posts[i].style.display = "none";
        }
    });
}


if (newPostForm) {
    newPostForm.addEventListener('submit', e => {
        e.preventDefault();
        const subject = document.getElementById('subject').value;
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postBody').value;
        createPost(subject, title, content);
    });
}


if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
}


if (currentPost) {
    currentPost.addEventListener('submit', e => {
        e.preventDefault();
        const post = JSON.parse(currentPost.dataset.post);

        if (e.submitter.innerHTML === 'Edit') {
            location.assign(`/menu/${post.subject}/edit/${post.slug}`);
        } else if (e.submitter.innerHTML === 'Remove') {
            if (confirm('Do you really want to delete the post???') === true) {
                removePost(post);
            }
        }
    });
}

if (editPost) {
    editPost.addEventListener('submit', e => {
        e.preventDefault();

        const post = JSON.parse(editPost.dataset.post);
        if (e.submitter.innerHTML === 'Submit') {
            const title = document.getElementById('editTitle').value;
            const content = document.getElementById('editBody').value;
            updatePost(post, title, content);
        } else if (e.submitter.innerHTML === 'Cancle') {
            if (confirm('Do you reall want to leave the site? Changes you made may not be saved') === true) {
                location.assign(`/menu/${post.subject}/${post.slug}`);
            }
        }
    })
}