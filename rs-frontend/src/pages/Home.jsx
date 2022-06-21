import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Content, Footer } = Layout;

const Home = () => {
    return (
        <Layout className="rs-home">
            <Content>
                <Link to="/platform">
                    功能页
                </Link>
            </Content>
            <Footer className="rs-footer">
                Remote Sensing ©2022 Created by 冲它吖的！
            </Footer>
        </Layout>
    );
}
 
export default Home;