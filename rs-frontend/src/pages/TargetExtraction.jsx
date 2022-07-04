import {
    Row,
    Col,
    Space,
    Divider,
    Button,
    Tooltip,
    Slider,
    Switch,
} from 'antd';

import FileUploader from '../components/FileUpload';
import ImageCanvas from '../components/ImageCanvas';

import testImg from '../assets/task/extract.png';
import testMask from '../assets/task/extract-mask.png';
import Mask from '../components/Mask';
import ColorPicker from '../components/ColorPicker';
import { EllipsisOutlined } from '@ant-design/icons';
import { RodeIcon } from '../components/icons';
import { useState, useContext } from 'react';
import { Context } from '../store';

const TargetExtraction = () => {
    const { imageStore } = useContext(Context);
    const [opacity, setOpacity] = useState(1);
    const [maskColor, setMaskColor] = useState('#ff0000');
    const [fill, setFill] = useState(false);
    const imageNode = new window.Image();
    imageNode.src = testImg;
    return (
        <div className="rs-target-extraction">
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
                        <h4>提取对象</h4>
                        <Space wrap>
                            <Tooltip title="道路">
                                <Button
                                    icon={<RodeIcon />}
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
                        <h4>遮罩颜色</h4>
                        <ColorPicker
                            color={maskColor}
                            onChange={(c) => setMaskColor(c)}
                        />
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
                    {/* {imageStore.selectedImages.length > 0 ? (
                        <ImageCanvas imageNode={imageNode}>
                            <Mask
                                opacity={opacity}
                                width={imageNode.width}
                                height={imageNode.height}
                                imgSrc={testMask}
                                fill={fill}
                            />
                        </ImageCanvas>
                    ) : (
                        <FileUploader />
                    )} */}
                </Col>
            </Row>
        </div>
    );
};

export default TargetExtraction;
