import {Button, Form, Input, DatePicker} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../../consts";
import React from "react";
import {useNavigate} from "react-router";
import {useAppDispatch} from "../../redux/store";
import {fetchRegistration} from "../../redux/user/asyncActions";
import moment from 'moment'

const RegistrationForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onFinish = async (values) => {
        try {
            dispatch(fetchRegistration({username:values.username,
                                        password:values.password,
                                        email:values.email,
                                        birthDate:values.date.$d})).then(jump)
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
                style={{width: 400}}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item name="date" label="Birth Date" >
                    <DatePicker
                        disabledDate={(current) => moment()  < current}
                    />
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
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[{
                        required: true,
                        message: 'Please confirm your password!',
                    },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        })]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Регистрация
                    </Button>
                </Form.Item>
                    <Form.Item>
                        Есть аккаунт? <a class="link" href={LOGIN_ROUTE}>Войдите</a>
                    </Form.Item>
            </Form>
        </>
    )
}


export default RegistrationForm