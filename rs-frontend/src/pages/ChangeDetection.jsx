import { useState } from 'react';
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
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons';

import ImageCanvas from '../components/ImageCanvas';
import Mask from '../components/Mask';

import testImg1 from '../assets/task/change-1.png';
import testImg2 from '../assets/task/change-2.png';
import testMask from '../assets/task/change-mask.png';
import { useEffect } from 'react';
import ColorPicker from '../components/ColorPicker';
import { BuildingIcon } from '../components/icons';

const ChangeDetection = () => {
    const [opacityLeft, setOpacityLeft] = useState(0);
    const [opacityRight, setOpacityRight] = useState(1);
    const [maskColorLeft, setMaskColorLeft] = useState('#ff0000');
    const [maskColorRight, setMaskColorRight] = useState('#ff0000');
    const [fillLeft, setFillLeft] = useState(false);
    const [fillRight, setFillRight] = useState(false);

    const [imageNode2, setImageNode2] = useState(null);

    const imageNode1 = new window.Image();
    imageNode1.src = testImg1;

    useEffect(() => {
        const image = new window.Image();
        image.src = testImg2;
        setImageNode2(image);
    }, []);

    return (
        <div className="rs-change-detection">
            <Row gutter={16} style={{ width: '100%', height: '100%' }}>
                <Col
                    span={4}
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
                            <Tooltip title="建筑">
                                <Button
                                    icon={<BuildingIcon />}
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
                        <h4>遮罩颜色(左)</h4>
                        <ColorPicker
                            color={maskColorLeft}
                            onChange={(c) => setMaskColorLeft(c)}
                        />
                        <h4>遮罩颜色(右)</h4>
                        <ColorPicker
                            color={maskColorRight}
                            onChange={(c) => setMaskColorRight(c)}
                        />
                        <Divider>结果调整</Divider>
                        <h4>只显示遮罩(左)</h4>
                        <Switch
                            checked={fillLeft}
                            onChange={(v) => {
                                setFillLeft(v);
                                setOpacityLeft(1);
                            }}
                        />
                        <h4>只显示遮罩(右)</h4>
                        <Switch
                            checked={fillRight}
                            onChange={(v) => {
                                setFillRight(v);
                                setOpacityRight(1);
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
                        <Button style={{ width: '100%' }}>保存结果(左)</Button>
                        <Button style={{ width: '100%' }}>保存结果(右)</Button>
                    </Space>
                </Col>
                <Col span={10}>
                    <div className="change-slider">
                        透明度
                        <Slider
                            min={0}
                            max={1}
                            step={0.02}
                            value={opacityLeft}
                            onChange={(value) => setOpacityLeft(value)}
                        />
                    </div>
                    <ImageCanvas imageNode={imageNode1}>
                        <Mask
                            opacity={opacityLeft}
                            width={imageNode1.width}
                            height={imageNode1.height}
                            imgSrc={testMask}
                            fill={fillLeft}
                        />
                    </ImageCanvas>
                </Col>
                <Col span={10}>
                    <div className="change-slider">
                        透明度
                        <Slider
                            min={0}
                            max={1}
                            step={0.02}
                            value={opacityRight}
                            onChange={(value) => setOpacityRight(value)}
                        />
                    </div>
                    {imageNode2 && (
                        <ImageCanvas imageNode={imageNode2}>
                            <Mask
                                opacity={opacityRight}
                                width={imageNode2.width}
                                height={imageNode2.height}
                                imgSrc={testMask}
                                fill={fillRight}
                            />
                        </ImageCanvas>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ChangeDetection;
