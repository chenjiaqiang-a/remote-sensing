import { Layout, Space, Tooltip, Avatar, Dropdown, Menu, Button, Modal } from "antd";
import { GithubFilled, MailFilled, SelectOutlined, SettingOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';
import { Link} from 'react-router-dom';

import logoImg from '../assets/logo.png';
import { useContext } from "react";
import loginContext from "../context/loginContext";

const { Header } = Layout;

const CustomHeader = () => {
    const { loginStatus, setLoginStatus } = useContext(loginContext);

    const handleLogout = () => {
        Modal.confirm({
            closable: true,
            content: "您确定想要退出登录吗？",
            onOk: () => setLoginStatus(false)
        })
    }

    const menu = (
        <Menu
            items={[
                {
                    label: <Link to="/platform">操作台</Link>,
                    icon: <ToolOutlined />,
                    key: 'platform'
                },
                {
                    label: <Link to="/user-info">个人信息</Link>,
                    icon: <SettingOutlined />,
                    key: 'user-info'
                },
                {
                    type: "divider"
                },
                {
                    label: <Button type="link" onClick={handleLogout}>退出登录</Button>,
                    key: 'logout'
                }
            ]}
        />
    )

    return (
        <Header className="rs-header">
            <Link to="/" className="logo">
                <img src={logoImg} alt="logo" />
                remote sensing
            </Link>
            <div className="user-avatar">
                <Space size="large">
                    {loginStatus ? (
                        <Dropdown
                            arrow={{pointAtCenter: true}}
                            overlay={menu}
                        >
                            <Avatar style={{backgroundColor: "#13227A"}} icon={<UserOutlined />} />
                        </Dropdown>
                    ) : (
                        <Tooltip title="登录 / 注册">
                            <Link
                                to="/login"
                                style={{display: "flex", alignItems: "center"}}
                            >
                                <Avatar icon={<UserOutlined />} />
                            </Link>
                        </Tooltip>
                    )}
                    <Tooltip title="给我们发邮件">
                        <a href="mailto:2504919775@qq.com"><MailFilled /></a>
                    </Tooltip>
                    <Tooltip title={<span>GitHub <SelectOutlined /></span>}>
                        <a href="https://github.com/chenjiaqiang-a/remote-sensing"><GithubFilled /></a>
                    </Tooltip>
                    
                </Space>
            </div>
        </Header>
    );
}
 
export default CustomHeader;