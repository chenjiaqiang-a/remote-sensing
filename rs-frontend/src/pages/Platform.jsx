import { Layout, Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';

const { Sider, Content, Footer } = Layout;

const items = [
    {
        key: 'target-extraction',
        label: <Link to="/platform/target-extraction">目标提取</Link>,
    },
    {
        key: 'change-detection',
        label: <Link to="/platform/change-detection">变化检测</Link>,
    },
    {
        key: 'object-detection',
        label: <Link to="/platform/object-detection">目标检测</Link>,
    },
    {
        key: 'feature-classification',
        label: <Link to="/platform/feature-classification">地物分类</Link>
    }
]

const Platform = () => {
    return (
        <Layout className="rs-platform">
            <Sider className="rs-sider" width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['target-extraction']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={items}
                />
            </Sider>
            <Layout>
                <Content className="rs-content">
                    <Outlet />
                </Content>
                <Footer className="rs-footer">
                    Remote Sensing ©2022 Created by 冲它吖的！
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Platform;
