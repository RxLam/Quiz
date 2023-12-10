import React, {useEffect} from "react";
import { Descriptions, Button } from 'antd';
import {fetchDeleteScores, fetchGetUserData} from "../redux/user/asyncActions";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData} from "../redux/user/selectors";



const Profile = () => {
    const dispatch = useDispatch()
    const username = localStorage.getItem('username')
    const userData = useSelector(selectUserData)

    useEffect(() => {
        dispatch(fetchGetUserData({username}))
    }, [])

   const refreshAllScores = () => {
        dispatch(fetchDeleteScores({username}))
        document.location.reload()
   }

    const items = [
        {
            key: '1',
            label: 'Username',
            children: username,
        },
        {
            key: '2',
            label: 'Email',
            children: userData.userInfo.email,
        },
        {
            key: '3',
            label: 'Birth Dater',
            children: userData.userInfo.birthDate,
        },
        {
            key: '4',
            label: 'Scores',
            children: userData.userInfo.scores || 0,
        },
    ];

    return (
        <div className='profile'>
            <Descriptions title="User Info" items={items} />
            <Button blue onClick={refreshAllScores}>Очистить все очки</Button>
        </div>
    )
}

export default Profile