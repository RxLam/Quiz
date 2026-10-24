import React from "react";
import {useLocation} from "react-router";
import {LOGIN_ROUTE} from "../consts";
import LoginForm from "../components/Forms/LoginForm";
import RegistrationForm from "../components/Forms/RegistrationForm";


const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

	return (
	    <>
            {isLogin ?
                <LoginForm/>:
                <RegistrationForm/>
            }
        </>
    )
}

export default Auth