import React from 'react';
const Logout = ({onLogout}) => {
    return (
        <button className="block py-2 px-2" onClick={onLogout}>
            Logout
        </button>
    );
};

export default Logout;
