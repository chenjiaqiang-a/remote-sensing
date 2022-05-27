import { GithubFilled, MailFilled, SelectOutlined } from '@ant-design/icons';
import { Layout, Menu, Space, Tooltip } from 'antd';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

import TargetExtraction from './pages/TargetExtraction';
import ChangeDetection from './pages/ChangeDetection';
import ObjectDetection from './pages/ObjectDetection';
import FeatureClassification from './pages/FeatureClassification';

import logoImg from './assets/logo.png';

const { Header, Content, Sider, Footer } = Layout;

const items = [
    {
        key: 'target-extraction',
        label: <Link to="/target-extraction">目标提取</Link>,
    },
    {
        key: 'change-detection',
        label: <Link to="/change-detection">变化检测</Link>,
    },
    {
        key: 'object-detection',
        label: <Link to="/object-detection">目标检测</Link>,
    },
    {
        key: 'feature-classification',
        label: <Link to="/feature-classification">地物分类</Link>
    }
]

function App() {
    return (
        <Layout className="rs-app">
            <Header className="rs-header">
                <div className="logo">
                    <img src={logoImg} alt="logo" />
                    remote sensing
                </div>
                <div className="user-avatar">
                    <Space size="large">
                        <Tooltip title="给我们发邮件">
                            <a href="mailto:2504919775@qq.com"><MailFilled /></a>
                        </Tooltip>
                        <Tooltip title={<span>GitHub <SelectOutlined /></span>}>
                            <a href="https://github.com/"><GithubFilled /></a>
                        </Tooltip>
                    </Space>
                </div>
            </Header>
            <Layout className="rs-body">
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
                        <Routes>
                            <Route path="/target-extraction" element={<TargetExtraction />} />
                            <Route path="/change-detection" element={<ChangeDetection />} />
                            <Route path="/object-detection" element={<ObjectDetection />} />
                            <Route path="/feature-classification" element={<FeatureClassification />} />
                            <Route path="*" element={<Navigate to="/target-extraction" replace />} />
                        </Routes>
                    </Content>
                    <Footer className="rs-footer">Remote Sensing ©2022 Created by 冲它吖的！</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default App;
