import { Form, Layout, Typography, Input, Row, Col, Button, message } from "antd";
import { useRef } from "react";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const validateMessages = {
    required: '此项不能为空！',
    types: {
        email: '电子邮件格式不正确！',
    }
};

const FindPassword = () => {
    const emailRef = useRef(null);

    const handleGetCaptcha = () => {
        const email = emailRef.current.input.value;
        if (!email) {
            message.warning("先请输入邮箱地址！");
            return;
        }
        console.log(email);
    };

    const handleFinish = (values) => {
        console.log(values);
    };

    return (
        <Layout className="rs-find-password">
            <Content>
                <Typography style={{maxWidth: 300, margin: '40px auto 0'}}>
                    <Title level={2}>
                        找回密码
                    </Title>
                    <Text type="secondary">
                        请输入需要找回密码的邮箱地址，我们将发送验证码邮件，请注意查收。
                    </Text>
                </Typography>
                <Form
                    name="find-password"
                    style={{maxWidth: 400, margin: '20px auto 0'}}
                    labelCol={{xs: {span: 24}, sm: {span: 8}}}
                    wrapperCol={{xs: {span: 24}, sm: {span: 16}}}
                    onFinish={handleFinish}
                    scrollToFirstError
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name="email"
                        label="邮箱地址"
                        rules={[{type: 'email'},{required: true}]}
                    >
                        <Input ref={emailRef} />
                    </Form.Item>
                    <Form.Item label="验证码" extra="请填入您收到的验证码">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                    rules={[{ required: true}]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Button onClick={handleGetCaptcha}>获取验证码</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="新密码"
                        rules={[{required: true}]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {required: true},
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不匹配！'));
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 16, offset: 8}}}>
                        <Button type="primary" htmlType="submit">修改密码</Button>
                    </Form.Item>
                </Form>
            </Content>
            <Footer className="rs-footer">
                Remote Sensing ©2022 Created by 冲它吖的！
            </Footer>
        </Layout>
    );
}
 
export default FindPassword;