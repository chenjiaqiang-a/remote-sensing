import {
    Row,
    Col,
    Space,
    Divider,
    Button,
    Tooltip,
    InputNumber,
    Slider,
} from 'antd';
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons';

import FileUploader from '../components/FileUpload';
import ImageCanvas from '../components/ImageCanvas';
import ColorPicker from '../components/ColorPicker';

import Anchor from '../components/Anchor';
import testImg from '../assets/images/bg-01.jpg';
import { useState } from 'react';
import { PlaygroundIcon } from '../components/icons';

const ObjectDetection = () => {
    const imageNode = new window.Image();
    imageNode.src = testImg;
    const [anchorWidth, setAnchorWidth] = useState(4);
    const [threshold, setThreshold] = useState(0.8);
    const [anchorColor, setAnchorColor] = useState('#000');
    const [labelColor, setLabelColor] = useState('#fff');

    return (
        <div className="rs-object-detection">
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
                        <Divider orientation="left">检测参数</Divider>
                        <h4>检测对象</h4>
                        <Space wrap>
                            <Tooltip title="操场">
                                <Button
                                    icon={<PlaygroundIcon />}
                                    shape="circle"
                                    type="primary"
                                />
                            </Tooltip>
                            <Tooltip title="更多模型训练中…">
                                <Button
                                    type="dashed"
                                    icon={<EllipsisOutlined />}
                                    shape="circle"
                                />
                            </Tooltip>
                        </Space>
                        <Divider orientation="left">结果调整</Divider>
                        <h4>阈值</h4>
                        <Slider
                            min={0}
                            max={1}
                            step={0.02}
                            value={threshold}
                            onChange={(v) => setThreshold(v)}
                        />
                        <h4>锚框粗细</h4>
                        <InputNumber
                            value={anchorWidth}
                            addonAfter="px"
                            onChange={(value) => setAnchorWidth(value)}
                        />
                        <h4>锚框颜色</h4>
                        <ColorPicker
                            color={anchorColor}
                            onChange={(c) => setAnchorColor(c)}
                        />
                        <h4>标签颜色</h4>
                        <ColorPicker
                            color={labelColor}
                            onChange={(c) => setLabelColor(c)}
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
                        <Anchor
                            anchorWidth={anchorWidth}
                            label="label"
                            color={anchorColor}
                            labelColor={labelColor}
                            x={100}
                            y={100}
                            width={400}
                            height={400}
                        />
                    </ImageCanvas>
                </Col>
            </Row>
        </div>
    );
};

export default ObjectDetection;
