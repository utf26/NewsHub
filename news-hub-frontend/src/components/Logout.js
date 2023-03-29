import React from 'react';
import api from "../services/api";
const Logout = ({onLogout}) => {
    const handleLogout = async () => {
        try {
            await api.post('/logout');
            onLogout()
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    return (
        <button className="block py-2 px-2" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
