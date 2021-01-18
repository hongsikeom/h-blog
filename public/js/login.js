import axios from 'axios';

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/login',
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



export const logout = async (email, password) => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/logout',
        });

        if (res.status === 200 || res.status === 201) {
            location.assign('/')
        }

    } catch (err) {
    }
};