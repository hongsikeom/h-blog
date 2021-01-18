import axios from 'axios';


export const getPost = async (post) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/menu/${post.subject}/${post.slug}`
        });

        if (res.status === 200) {
            location.assign(`/menu/${post.subject}/${post.slug}`);
        }

    } catch (err) {
        console.log(err.stack);
        alert('Get Error...');
    }
};


export const createPost = async (subject, title, content) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/compose',
            data: {
                subject,
                title,
                content
            }
        });

        if (res.status === 201) {
            location.assign(`/menu/${subject}`);
        }

    } catch (err) {
        console.log(err.stack);
        alert('Create Error...');
    }
};



export const updatePost = async (post, title, content) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/menu/${post.subject}/update/${post.slug}`,
            data: {
                id: post._id,
                subject: post.subject,
                title,
                content
            }
        });

        if (res.status === 201) {
            location.assign(`/menu/${post.subject}/${post.slug}`);
        }

    } catch (err) {
        alert('Upload Error...');
    }
};


export const removePost = async (post) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/menu/${post.subject}/remove/${post.slug}`,
            data: {
                id: post._id, subject: post.subject
            }
        });


        if (res.status === 204) {
            location.assign(`/menu/${post.subject}`);
        }


    } catch (err) {
        alert('You are not logged in! Please log in to get access');
    }
};