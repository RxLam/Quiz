import React from 'react';
import NavBar from "./NavBar";
import Search from "./Search";
import UserInfo from "./UserInfo";


const Header = () => {
    return (
        <>
            <Search/>
            <UserInfo/>
        </>
    )
}

export default Header