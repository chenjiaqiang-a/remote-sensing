import { Layout } from "antd";

const { Footer, Content } = Layout;

const Login = () => {
    return (
        <Layout className="rs-login">
            <Content>
                Login
            </Content>
            <Footer className="rs-footer">
                Remote Sensing ©2022 Created by 冲它吖的！
            </Footer>
        </Layout>
    );
}
 
export default Login;