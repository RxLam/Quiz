import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../../consts";
import React from "react";
import {useLocation, useNavigate} from "react-router";
import {useAppDispatch} from "../../redux/store";
import {fetchLogin} from "../../redux/user/asyncActions";

const LoginForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const isLogin = location.pathname === LOGIN_ROUTE

    const onFinish = async (values) => {
        try {
            await dispatch(fetchLogin({username:values.username,password:values.password})).then(jump)
        } catch (e) {
            alert(e || 'ERROR')
        }
    };

    const jump = () => {
        if(localStorage.getItem('username')) navigate(MAIN_ROUTE)
    }

    return (
        <>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Войти
                </Button>
            </Form.Item>
            {isLogin ?
                <Form.Item>
                    Нет аккаунта? <a class="link" href={REGISTRATION_ROUTE}>Зарегестрируйтесь</a>
                </Form.Item>
                :
                <Form.Item>
                    Есть аккаунт? <a class="link" href={LOGIN_ROUTE}>Войдите</a>
                </Form.Item>
            }
        </Form>
        </>
    )
}


export default LoginForm