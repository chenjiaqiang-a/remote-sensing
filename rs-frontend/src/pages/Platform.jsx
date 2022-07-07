import { useState, useEffect, useContext } from 'react';
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
    message,
    Modal,
} from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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
import { Context } from '../store';

const { Sider, Content, Footer } = Layout;

const Platform = () => {
    let current = 'target-extraction';
    const location = useLocation();
    const paths = location.pathname.split('/');
    if (paths.length > 2) {
        current = paths[paths.length - 1];
    }
    const { imageStore, detectionStore } = useContext(Context);

    const [searchKey, setSearchKey] = useState('');
    const [currentKey, setCurrentKey] = useState(current);
    const [listData, setListData] = useState([]);
    const [collapsedLeft, setCollapsedLeft] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const initList = imageStore.imageList.map((item) => ({
            ...item,
            checked:
                imageStore.selectedImages.findIndex((i) => i.id === item.id) !==
                -1,
        }));

        const newList = initList.filter(
            (item) => item.filename.indexOf(searchKey) !== -1
        );

        setListData(newList);
    }, [imageStore.imageList, imageStore.selectedImages, searchKey]);

    const handleFilterChange = debounce((e) => {
        setSearchKey(e.target.value);
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

    const handleImgChange = (item) => {
        if (detectionStore.isDetecting()) {
            message.warning('检测中，禁止切换图片！');
            return;
        }
        if (detectionStore.isDone()) {
            Modal.confirm({
                title: '确定切换图片吗？',
                content:
                    '本功能下您已有检测结果，请妥善保存检测结果，如果切换图片将会丢失本次结果。',
                onOk: () => {
                    detectionStore.setPreparing();
                    imageStore.changeSelectedImage({
                        id: item.id,
                        filename: item.filename,
                        src: item.src,
                    });
                },
            });
        }
        if (detectionStore.isPreParing()) {
            imageStore.changeSelectedImage({
                id: item.id,
                filename: item.filename,
                src: item.src,
            });
        }
    };

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
                                <Button
                                    disabled={item.checked}
                                    onClick={() => handleImgChange(item)}
                                    icon={<SelectOutlined />}
                                    type="link"
                                />
                            </Tooltip>,
                            <Tooltip title="删除">
                                <Button
                                    disabled={
                                        item.checked &&
                                        detectionStore.isDetecting()
                                    }
                                    onClick={() =>
                                        imageStore.deleteImage(item.id)
                                    }
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

    const handleMenuChange = (e) => {
        if (detectionStore.isDetecting()) {
            message.warning('检测中，禁止切换功能！');
            return;
        }
        if (detectionStore.isDone()) {
            Modal.confirm({
                title: '确定切换功能吗？',
                content:
                    '本功能下您已有检测结果，请妥善保存检测结果，如果切换功能将会丢失本次结果。',
                onOk: () => {
                    detectionStore.setPreparing();
                    if (imageStore.selectedImages.length > 0) {
                        imageStore.setSelectedImages([
                            imageStore.selectedImages[0],
                        ]);
                    }
                    setCurrentKey(e.key);
                    nav(`/platform/${e.key}`);
                },
            });
        }
        if (detectionStore.isPreParing()) {
            if (imageStore.selectedImages.length > 0) {
                imageStore.setSelectedImages([imageStore.selectedImages[0]]);
            }
            setCurrentKey(e.key);
            nav(`/platform/${e.key}`);
        }
    };

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
                    onClick={handleMenuChange}
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
            <Sider className="rs-sider-right" width={300} theme="light">
                {fileList}
            </Sider>
        </Layout>
    );
};

export default Platform;
