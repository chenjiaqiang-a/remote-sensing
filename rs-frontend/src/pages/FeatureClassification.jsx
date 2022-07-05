import {
    Row,
    Col,
    Space,
    Divider,
    Button,
    Tooltip,
    Slider,
    Avatar,
    Switch,
} from 'antd';

import FileUploader from '../components/FileUpload';
import ImageCanvas from '../components/ImageCanvas';

import testImg from '../assets/task/classes.jpg';
import testMask from '../assets/task/classes-mask.png';
import Mask from '../components/Mask';
import { EllipsisOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { BuildingIcon, RodeIcon, TreeIcon } from '../components/icons';

const FeatureClassification = () => {
    const [opacity, setOpacity] = useState(1);
    const [fill, setFill] = useState(false);
    const imageNode = new window.Image();
    imageNode.src = testImg;
    return (
        <div className="rs-feature-classification">
            <Row gutter={16} style={{ width: '100%', height: '100%' }}>
                <Col
                    span={6}
                    style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Divider orientation="left">目标类别</Divider>
                        <Space wrap>
                            <Tooltip title="林地">
                                <Avatar
                                    icon={<TreeIcon />}
                                    style={{ backgroundColor: '#1eff8e' }}
                                />
                            </Tooltip>
                            <Tooltip title="道路">
                                <Avatar
                                    icon={<RodeIcon />}
                                    style={{ backgroundColor: '#1e00ff' }}
                                />
                            </Tooltip>
                            <Tooltip title="建筑">
                                <Avatar
                                    icon={<BuildingIcon />}
                                    style={{ backgroundColor: '#ff0000' }}
                                />
                            </Tooltip>
                            <Tooltip title="其它">
                                <Avatar
                                    icon={<EllipsisOutlined />}
                                    style={{ backgroundColor: '#ffde00' }}
                                />
                            </Tooltip>
                        </Space>
                        <Divider orientation="left">结果调整</Divider>
                        <h4>透明度</h4>
                        <Slider
                            min={0}
                            max={1}
                            step={0.02}
                            value={opacity}
                            onChange={(value) => setOpacity(value)}
                        />
                        <h4>只显示遮罩</h4>
                        <Switch
                            checked={fill}
                            onChange={(v) => {
                                setFill(v);
                                setOpacity(1);
                            }}
                        />
                    </Space>
                    <Space
                        direction="vertical"
                        style={{ width: '100%', marginTop: 'auto' }}
                    >
                        <Button style={{ width: '100%' }} type="primary">
                            开始检测
                        </Button>
                        <Button style={{ width: '100%' }}>保存结果</Button>
                    </Space>
                </Col>
                <Col span={18}>
                    <ImageCanvas imageNode={imageNode}>
                        <Mask
                            opacity={opacity}
                            width={imageNode.width}
                            height={imageNode.height}
                            imgSrc={testMask}
                            fill={fill}
                        />
                    </ImageCanvas>
                    {/* <FileUploader /> */}
                </Col>
            </Row>
        </div>
    );
};

export default FeatureClassification;
