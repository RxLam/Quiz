import React, { useState } from 'react';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import {Button, Menu} from 'antd';
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "../consts";
import UserInfo from "./UserInfo";
import {useNavigate} from "react-router";

const items = [
	{
		label: (
		<a href={MAIN_ROUTE}>
			Main
		</a>
		),
		key: 'main',
		icon: <AppstoreOutlined />,

	},
];

const privateItems = [
	...items,
	{
		label: (
			<a href={ADMIN_ROUTE}>
				Admin
			</a>
		),
		key: 'adm',
		icon: <SettingOutlined />,
	},
	{
		label: (
			<a href={PROFILE_ROUTE} >
				<UserInfo />
			</a>
		),
		key: 'userInfo',
	},
];



const NavBar = () => {
	const [current, setCurrent] = useState('');
	const navigate = useNavigate()

	const onClick = (e) => {
		setCurrent(e.key);
	};

	const logOut = () => {
		localStorage.removeItem('username')
		navigate(LOGIN_ROUTE)
	}

	const logIn = () => {
		navigate(LOGIN_ROUTE)
	}

	return (
		<>
			<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={localStorage.getItem('username')?privateItems:items} />
			<div style={{display: 'flex', justifyContent: 'right'}}>
				{localStorage.getItem('username') ? <Button danger onClick={logOut}>Log Out</Button>:
				<Button onClick={logIn}>Log In</Button>
				}
			</div>
		</>
	)
};

export default NavBar;