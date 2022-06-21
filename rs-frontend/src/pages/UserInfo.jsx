import { Layout, Typography, Form, Input, InputNumber, Select, Button, Tabs } from "antd";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const validateMessages = {
    required: '此项不能为空！',
    types: {
        email: '电子邮件格式不正确！',
        number: '数字的格式不正确！'
    },
    number: {
        range: '该项数字大小应介于${min}-${max}',
    },
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);

const ChangeUserInfoForm = () => {
    const handleFinish = (values) => {
        console.log(values);
    };
    return (
        <Form
            name="change-user-info"
            labelCol={{xs: {span: 24}, sm: {span: 8}}}
            wrapperCol={{xs: {span: 24}, sm: {span: 16}}}
            onFinish={handleFinish}
            initialValues={{
                email: '123@123.com',
                phone: '12345678901',
                name: 'Jack Chen',
                age: 20,
                gender: 'other',
                prefix: '86'
            }}
            scrollToFirstError
            validateMessages={validateMessages}
        >
            <Form.Item
                name="email"
                label="邮箱地址"
                rules={[{type: 'email'},{required: true}]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="name" label="姓名">
                <Input />
            </Form.Item>
            <Form.Item name="age" label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name="gender" label="性别">
                <Select>
                    <Option value="male">男</Option>
                    <Option value="female">女</Option>
                    <Option value="other">不透露</Option>
                </Select>
            </Form.Item>
            <Form.Item name="phone" label="联系电话">
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 16, offset: 8}}}>
                <Button type="primary" htmlType="submit">保存修改</Button>
            </Form.Item>
        </Form>
    );
}

const ChangePasswordForm = () => {
    const handleFinish = (values) => {
        console.log(values);
    };
    return (
        <Form
            name="change-password"
            labelCol={{xs: {span: 24}, sm: {span: 8}}}
            wrapperCol={{xs: {span: 24}, sm: {span: 16}}}
            onFinish={handleFinish}
            scrollToFirstError
            validateMessages={validateMessages}
        >
            <Form.Item
                name="original"
                label="原密码"
                rules={[{required: true}]}
            >
                <Input.Password />
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
                <Button type="primary" htmlType="submit">提交修改</Button>
            </Form.Item>
        </Form>
    );
}
  
const UserInfo = () => {
    
    return (
        <Layout className="rs-user-info">
            <Content>
                <Typography style={{maxWidth: 300, margin: '40px auto 0'}}>
                    <Title level={2}>
                        个人信息
                    </Title>
                    <Text type="secondary">
                        修改个人信息后，请点击保存提交。
                    </Text>
                </Typography>
                <Tabs
                    style={{maxWidth: 400, margin: '0 auto'}}
                    defaultActiveKey="change-info"
                    centered
                    size="large"
                >
                    <Tabs.TabPane style={{width: '100%'}} tab="修改个人信息" key="change-info">
                        <ChangeUserInfoForm />
                    </Tabs.TabPane>
                    <Tabs.TabPane style={{width: '100%'}} tab="修改密码" key="change-password">
                        <ChangePasswordForm />
                    </Tabs.TabPane>
                </Tabs>
            </Content>
            <Footer className="rs-footer">
                Remote Sensing ©2022 Created by 冲它吖的！
            </Footer>
        </Layout>
    );
}
 
export default UserInfo;