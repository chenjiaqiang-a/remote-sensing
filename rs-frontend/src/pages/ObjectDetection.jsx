import { useState, useContext, useEffect, useRef } from 'react';
import {
    Row,
    Col,
    Space,
    Divider,
    Button,
    Tooltip,
    InputNumber,
    Slider,
    message,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import FileUploader from '../components/FileUpload';
import ImageCanvas from '../components/ImageCanvas';
import ColorPicker from '../components/ColorPicker';
import Anchor from '../components/Anchor';
import { PlaygroundIcon } from '../components/icons';
import { Context } from '../store';
import { useObjectDetection } from '../hooks';
import { saveImage } from '../utils';

const ObjectDetection = () => {
    const { imageStore, detectionStore } = useContext(Context);
    const [anchorWidth, setAnchorWidth] = useState(4);
    const [threshold, setThreshold] = useState(0.8);
    const [anchorColor, setAnchorColor] = useState('#000');
    const [labelColor, setLabelColor] = useState('#fff');
    const [bboxes, setBboxes] = useState([]);
    const { detecting, handleDetection: detect } = useObjectDetection();
    const stageRef = useRef(null);

    const imageNode = new window.Image();
    if (imageStore.selectedImages.length > 0) {
        imageNode.src = imageStore.selectedImages[0].src;
    }

    const handleDetection = async () => {
        detectionStore.setDetecting();
        try {
            const result = await detect(imageStore.selectedImages[0]);
            if (result.code === 200) {
                setBboxes(result.data);
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
        saveImage(dataUrl, 'object-detection.png');
    };

    useEffect(() => {
        if (!imageStore.isInMode('object-detection')) {
            imageStore.setMode('object-detection');
        }
    }, [imageStore]);

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
                            disabled={!detectionStore.isDone()}
                            style={{ width: '100%' }}
                            onClick={handleSave}
                        >
                            保存结果
                        </Button>
                    </Space>
                </Col>
                <Col span={18}>
                    {imageStore.selectedImages.length > 0 ? (
                        <ImageCanvas stageRef={stageRef} imageNode={imageNode}>
                            {detectionStore.isDone() &&
                                bboxes
                                    .filter((bbox) => bbox.score >= threshold)
                                    .sort((a, b) => a.score - b.score)
                                    .map((bbox) => (
                                        <Anchor
                                            key={bbox.score.toString()}
                                            anchorWidth={anchorWidth}
                                            label={`${
                                                bbox.category
                                            } ${bbox.score.toFixed(2)}`}
                                            color={anchorColor}
                                            labelColor={labelColor}
                                            x={bbox.bbox[0]}
                                            y={bbox.bbox[1]}
                                            width={bbox.bbox[2]}
                                            height={bbox.bbox[3]}
                                        />
                                    ))}
                        </ImageCanvas>
                    ) : (
                        <FileUploader />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ObjectDetection;
