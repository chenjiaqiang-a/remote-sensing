import {
    Layout,
    Space,
    Tooltip,
    Avatar,
    Dropdown,
    Menu,
    Button,
    Modal,
    message,
} from 'antd';
import {
    GithubFilled,
    MailFilled,
    SelectOutlined,
    SettingOutlined,
    ToolOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import logoImg from '../assets/images/logo.png';
import { useContext } from 'react';
import { Context } from '../store';
import { useLogout } from '../hooks';

const { Header } = Layout;

const CustomHeader = () => {
    const { handleLogout, pending } = useLogout();
    const { userStore } = useContext(Context);
    const {
        userInfo: { isLogin },
    } = userStore;

    const handleLogoutClick = () => {
        Modal.confirm({
            closable: true,
            content: '您确定想要退出登录吗？',
            okButtonProps: {
                loading: pending,
            },
            onOk: async () => {
                // request
                try {
                    const result = await handleLogout();
                    if (result.code === 1) {
                        message.success('登出成功！');
                        userStore.setLogout();
                    } else {
                        throw Error('登出失败！')
                    }
                } catch (error) {
                    message.error(error.message);
                }
            },
        });
    };

    const menu = (
        <Menu
            items={[
                {
                    label: <Link to="/platform">操作台</Link>,
                    icon: <ToolOutlined />,
                    key: 'platform',
                },
                {
                    label: <Link to="/user-info">个人信息</Link>,
                    icon: <SettingOutlined />,
                    key: 'user-info',
                },
                {
                    type: 'divider',
                },
                {
                    label: (
                        <Button type="link" onClick={handleLogoutClick}>
                            退出登录
                        </Button>
                    ),
                    key: 'logout',
                },
            ]}
        />
    );

    return (
        <Header className="rs-header">
            <Link to="/" className="logo">
                <img src={logoImg} alt="logo" />
                remote sensing
            </Link>
            <div className="user-avatar">
                <Space size="large">
                    {isLogin ? (
                        <Dropdown
                            arrow={{ pointAtCenter: true }}
                            overlay={menu}
                        >
                            <Avatar
                                style={{ backgroundColor: '#13227A' }}
                                icon={<UserOutlined />}
                            />
                        </Dropdown>
                    ) : (
                        <Tooltip title="登录 / 注册">
                            <Link
                                to="/login"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar icon={<UserOutlined />} />
                            </Link>
                        </Tooltip>
                    )}
                    <Tooltip title="给我们发邮件">
                        <a href="mailto:2504919775@qq.com">
                            <MailFilled />
                        </a>
                    </Tooltip>
                    <Tooltip
                        title={
                            <span>
                                GitHub <SelectOutlined />
                            </span>
                        }
                    >
                        <a href="https://github.com/chenjiaqiang-a/remote-sensing">
                            <GithubFilled />
                        </a>
                    </Tooltip>
                </Space>
            </div>
        </Header>
    );
};

export default CustomHeader;
