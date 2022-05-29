import { GithubFilled, MailFilled, SelectOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Space, Tooltip, Avatar } from 'antd';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Platform from './pages/Platform';
import TargetExtraction from './pages/TargetExtraction';
import ChangeDetection from './pages/ChangeDetection';
import ObjectDetection from './pages/ObjectDetection';
import FeatureClassification from './pages/FeatureClassification';

import logoImg from './assets/logo.png';

const { Header } = Layout;



function App() {
    return (
        <Layout className="rs-app">
            <Header className="rs-header">
                <Link to="/" className="logo">
                    <img src={logoImg} alt="logo" />
                    remote sensing
                </Link>
                <div className="user-avatar">
                    <Space size="large">
                        <Tooltip title="给我们发邮件">
                            <a href="mailto:2504919775@qq.com"><MailFilled /></a>
                        </Tooltip>
                        <Tooltip title={<span>GitHub <SelectOutlined /></span>}>
                            <a href="https://github.com/chenjiaqiang-a/remote-sensing"><GithubFilled /></a>
                        </Tooltip>
                        <Tooltip title="登录 / 注册">
                            <Link
                                to="/login"
                                element={<Login />}
                                style={{display: "flex", alignItems: "center"}}
                            >
                                <Avatar icon={<UserOutlined />} />
                            </Link>
                        </Tooltip>
                    </Space>
                </div>
            </Header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="platform" element={<Platform />}>
                    <Route path="target-extraction" element={<TargetExtraction />} />
                    <Route path="change-detection" element={<ChangeDetection />} />
                    <Route path="object-detection" element={<ObjectDetection />} />
                    <Route path="feature-classification" element={<FeatureClassification />} />
                    <Route index element={<Navigate to="target-extraction" replace />} />
                    <Route path="*" element={<Navigate to="target-extraction" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Layout>
    );
}

export default App;
