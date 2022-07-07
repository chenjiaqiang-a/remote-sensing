import { useState, useContext, useEffect, useRef } from 'react';
import {
    Row,
    Col,
    Space,
    Divider,
    Button,
    Tooltip,
    Slider,
    Switch,
    message,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import FileUploader from '../components/FileUpload';
import ImageCanvas from '../components/ImageCanvas';
import Mask from '../components/Mask';
import ColorPicker from '../components/ColorPicker';
import { RodeIcon } from '../components/icons';
import { Context } from '../store';
import { useTargetExtraction } from '../hooks';
import { saveImage } from '../utils';

const TargetExtraction = () => {
    const { imageStore, detectionStore } = useContext(Context);
    const [opacity, setOpacity] = useState(1);
    const [maskColor, setMaskColor] = useState('#ff0000');
    const [fill, setFill] = useState(false);
    const [maskSrc, setMaskSrc] = useState('');
    const { detecting, handleDetection: detect } = useTargetExtraction();
    const stageRef = useRef(null);

    const imageNode = new window.Image();
    if (imageStore.selectedImages.length > 0) {
        imageNode.src = imageStore.selectedImages[0].src;
    }

    const handleDetection = async () => {
        detectionStore.setDetecting();
        try {
            const result = await detect(
                imageStore.selectedImages[0],
                maskColor
            );
            if (result.code === 200) {
                setMaskSrc('data:image/png;base64,' + result.data);
                detectionStore.setDone();
            } else {
                throw Error('检测失败！');
            }
        } catch (error) {
            message.error(error.message);
            detectionStore.setPreparing();
        }
    };

    const handleSave = () => {
        const dataUrl = stageRef.current.toDataURL();
        saveImage(dataUrl, 'target-extraction.png');
    };

    useEffect(() => {
        if (!imageStore.isInMode('target-extraction')) {
            imageStore.setMode('target-extraction');
        }
    }, [imageStore]);

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
                            disabled={!detectionStore.isDone()}
                            onChange={(value) => setOpacity(value)}
                        />
                        <h4>只显示遮罩</h4>
                        <Switch
                            disabled={!detectionStore.isDone()}
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
                        <Button
                            disabled={imageStore.selectedImages.length < 1}
                            onClick={handleDetection}
                            loading={detecting}
                            style={{ width: '100%' }}
                            type="primary"
                        >
                            开始检测
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={!detectionStore.isDone()}
                            style={{ width: '100%' }}
                        >
                            保存结果
                        </Button>
                    </Space>
                </Col>
                <Col span={18}>
                    {imageStore.selectedImages.length > 0 ? (
                        <ImageCanvas stageRef={stageRef} imageNode={imageNode}>
                            {detectionStore.isDone() && (
                                <Mask
                                    opacity={opacity}
                                    width={imageNode.width}
                                    height={imageNode.height}
                                    imgSrc={maskSrc}
                                    fill={fill}
                                />
                            )}
                        </ImageCanvas>
                    ) : (
                        <FileUploader />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default TargetExtraction;
