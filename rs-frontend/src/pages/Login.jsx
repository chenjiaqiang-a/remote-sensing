import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Layout, Modal, Tabs, Typography } from "antd";
import { Link } from "react-router-dom";
import logoImg from '../assets/logo.png';

const { Footer, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const validateMessages = {
    required: '此项不能为空！',
    types: {
        email: '电子邮件格式不正确！',
    }
};

const LoginForm = () => {

    const handleFinish = (values) => {
        console.log(values);
    }

    return (
        <Form
            name="login"
            validateMessages={validateMessages}
            initialValues={{remember: true}}
            onFinish={handleFinish}
            style={{maxWidth: 300, margin: '0 auto'}}
        >
            <Form.Item
                name="email"
                rules={[{type: 'email'}, {required: true}]}
            >
                <Input prefix={<MailOutlined />} placeholder="邮箱地址" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true}]}
            >
                <Input prefix={<LockOutlined/>} type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>
                <Link to="/find-password" style={{float: 'right'}}>忘记密码？</Link>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
}

const agreementContent = (
    <Typography>
        <Title>用户协议</Title>
        <Paragraph>
            蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
        </Paragraph>
        <Paragraph>
            随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁金服体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系
            Ant Design。基于<Text mark>『确定』和『自然』</Text>
            的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于
            <Text strong>更好的用户体验</Text>。
        </Paragraph>
        <Title level={2}>设计资源</Title>
        <Paragraph>
            我们提供完善的设计原则、最佳实践和设计资源文件（<Text code>Sketch</Text> 和
            <Text code>Axure</Text>），来帮助业务快速设计出高质量的产品原型。
        </Paragraph>
        <Paragraph>
            蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
        </Paragraph>
        <Paragraph>
            随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁金服体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系
            Ant Design。基于<Text mark>『确定』和『自然』</Text>
            的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于
            <Text strong>更好的用户体验</Text>。
        </Paragraph>
    </Typography> 
)

const RegisterForm = () => {
    const handleFinish = (values) => {
        console.log(values);
    }

    const showAgreement = () => {
        Modal.info({
            icon: null,
            width: 600,
            content: agreementContent
        })
    };

    return (
        <Form
            name="register"
            labelCol={{xs: {span: 24}, sm: {span: 8}}}
            wrapperCol={{xs: {span: 24}, sm: {span: 16}}}
            onFinish={handleFinish}
            scrollToFirstError
            validateMessages={validateMessages}
        >
            <Form.Item
                name="email"
                label="邮箱地址"
                rules={[{type: 'email'}, {required: true}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
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
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('需要您接受我们的协议！'))}
                ]}
                wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 16, offset: 8}}}
            >
                <Checkbox>
                    我已阅读<Button type="link" style={{padding: 0}} onClick={showAgreement}>用户协议</Button>
                </Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 16, offset: 8}}}>
                <Button type="primary" htmlType="submit">注册</Button>
            </Form.Item>
        </Form>
    )
}

const Login = () => {
    return (
        <Layout className="rs-login">
            <Content >
                <Typography style={{textAlign: "center", maxWidth: 300, margin: '40px auto 0'}}>
                    <Title level={2}>
                        <img style={{height: 60}} src={logoImg} alt="logo" /> Remote Sensing
                    </Title>
                    <Text type="secondary">基于深度学习的多功能遥感影像处理平台，给你直观、简洁、方便的体验</Text>
                </Typography>
                <Tabs
                    style={{maxWidth: 400, margin: '0 auto'}}
                    defaultActiveKey="login"
                    centered
                    size="large"
                >
                    <Tabs.TabPane style={{width: '100%'}} tab="登录" key="login">
                        <LoginForm />
                    </Tabs.TabPane>
                    <Tabs.TabPane style={{width: '100%'}} tab="注册" key="register">
                        <RegisterForm />
                    </Tabs.TabPane>
                </Tabs>
            </Content>
            <Footer className="rs-footer">
                Remote Sensing ©2022 Created by 冲它吖的！
            </Footer>
        </Layout>
    );
}
 
export default Login;