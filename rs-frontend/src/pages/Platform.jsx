import { useState } from 'react';
import {
    Layout,
    Menu,
    List,
    Typography,
    Input,
    Button,
    Tag,
    Tooltip,
    Upload,
} from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import {
    DeleteOutlined,
    FileImageOutlined,
    SearchOutlined,
    SelectOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { debounce } from '../utils';
import { useUpload } from '../hooks';
import { platformMenu } from '../config/menu';

const { Sider, Content, Footer } = Layout;

const testData = [...Array(15)].map((_, idx) => ({
    id: idx,
    checked: idx === 4,
    filename: `${idx}-test.png`,
}));

const Platform = () => {
    let current = 'target-extraction';
    const location = useLocation();
    const paths = location.pathname.split('/');
    if (paths.length > 2) {
        current = paths[paths.length - 1];
    }
    const [currentKey, setCurrentKey] = useState(current);
    const [listData, setListData] = useState(testData);
    const [collapsedLeft, setCollapsedLeft] = useState(false);

    const handleFilterChange = debounce((e) => {
        const text = e.target.value;
        const newList = testData.filter(
            (item) => item.filename.indexOf(text) !== -1
        );
        setListData(newList);
    }, 1000);

    const listHeader = (
        <div>
            <Typography.Title level={3}>文件列表</Typography.Title>
            <Input
                prefix={<SearchOutlined />}
                placeholder="输入关键字筛选……"
                onChange={handleFilterChange}
            />
        </div>
    );

    const fileList = (
        <>
            <List
                header={listHeader}
                dataSource={listData}
                style={{ marginBottom: 20 }}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Tooltip title="选择">
                                <Button icon={<SelectOutlined />} type="link" />
                            </Tooltip>,
                            <Tooltip title="删除">
                                <Button
                                    icon={<DeleteOutlined />}
                                    type="link"
                                    danger
                                />
                            </Tooltip>,
                        ]}
                    >
                        <Tag
                            icon={<FileImageOutlined />}
                            color={item.checked ? '#2db7f5' : 'blue'}
                        >
                            {item.filename}
                        </Tag>
                    </List.Item>
                )}
            />
            <Upload {...useUpload()}>
                <Button icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
        </>
    );

    return (
        <Layout className="rs-platform">
            <Sider
                className="rs-sider-left"
                width={200}
                theme="light"
                collapsible
                collapsed={collapsedLeft}
                onCollapse={(v) => setCollapsedLeft(v)}
            >
                <Menu
                    mode="inline"
                    selectedKeys={[currentKey]}
                    style={{ height: '100%', borderRight: 0 }}
                    items={platformMenu}
                    onClick={(e) => setCurrentKey(e.key)}
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
            <Sider
                className="rs-sider-right"
                width={300}
                theme="light"
            >
                {fileList}
            </Sider>
        </Layout>
    );
};

export default Platform;
