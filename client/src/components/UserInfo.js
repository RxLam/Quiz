import React from 'react';

const UserInfo = () => {

    return (
        <div>
            {localStorage.getItem('username')}
        </div>
    )
}

export default UserInfo