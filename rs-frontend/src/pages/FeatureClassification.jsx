import { useState, useContext, useEffect, useRef } from 'react';
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
    message,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import FileUploader from '../components/FileUpload';
import ImageCanvas from '../components/ImageCanvas';
import Mask from '../components/Mask';
import { BuildingIcon, RodeIcon, TreeIcon } from '../components/icons';
import { Context } from '../store';
import { useFeatureClassification } from '../hooks';
import { saveImage } from '../utils';

const FeatureClassification = () => {
    const { imageStore, detectionStore } = useContext(Context);
    const [opacity, setOpacity] = useState(1);
    const [fill, setFill] = useState(false);
    const [maskSrc, setMaskSrc] = useState('');
    const { detecting, handleDetection: detect } = useFeatureClassification();
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
        saveImage(dataUrl, 'feature-classification.png');
    };

    useEffect(() => {
        if (!imageStore.isInMode('feature-classification')) {
            imageStore.setMode('feature-classification');
        }
    }, [imageStore]);

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
                            disabled={!detectionStore.isDone()}
                            onChange={(value) => setOpacity(value)}
                        />
                        <h4>只显示遮罩</h4>
                        <Switch
                            checked={fill}
                            disabled={!detectionStore.isDone()}
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
                            loading={detecting}
                            onClick={handleDetection}
                            style={{ width: '100%' }}
                            type="primary"
                        >
                            开始检测
                        </Button>
                        <Button
                            disabled={!detectionStore.isDone()}
                            onClick={handleSave}
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

export default FeatureClassification;
