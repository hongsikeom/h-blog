import axios from 'axios';

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: {
                email,
                password
            }
        });

        if (res.status === 200 || res.status === 201) {
            location.assign('/')
        }

    } catch (err) {
        alert('Invalid email or password');
    }
};