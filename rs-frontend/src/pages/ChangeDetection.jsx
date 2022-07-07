import { useState, useContext } from 'react';
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

import ImageCanvas from '../components/ImageCanvas';
import FileUploader from '../components/FileUpload';
import Mask from '../components/Mask';
import ColorPicker from '../components/ColorPicker';
import { BuildingIcon } from '../components/icons';
import { Context } from '../store';
import { useChangeDetection } from '../hooks';

const ChangeDetection = () => {
    const { imageStore, detectionStore } = useContext(Context);
    const [opacityLeft, setOpacityLeft] = useState(0);
    const [opacityRight, setOpacityRight] = useState(1);
    const [maskColorLeft, setMaskColorLeft] = useState('#ff0000');
    const [maskColorRight, setMaskColorRight] = useState('#ff0000');
    const [maskSrcLeft, setMaskSrcLeft] = useState('');
    const [maskSrcRight, setMaskSrcRight] = useState('');
    const [fillLeft, setFillLeft] = useState(false);
    const [fillRight, setFillRight] = useState(false);
    const { detecting, handleDetection: detect } = useChangeDetection();

    const imageNodeLeft = new window.Image();
    if (imageStore.selectedImages.length > 0) {
        imageNodeLeft.src = imageStore.selectedImages[0].src;
    }

    const imageNodeRight = new window.Image();
    if (imageStore.selectedImages.length > 1) {
        imageNodeRight.src = imageStore.selectedImages[1].src;
    }

    const handleDetection = async () => {
        detectionStore.setDetecting();
        try {
            const result = await detect(
                imageStore.selectedImages[0],
                maskColorLeft,
                imageStore.selectedImages[1],
                maskColorRight,
            );
            if (result[0].code === 200 && result[1].code === 200) {
                setMaskSrcLeft('data:image/png;base64,' + result[0].data);
                setMaskSrcRight('data:image/png;base64,' + result[1].data);
                detectionStore.setDone();
            } else {
                throw Error('检测失败！');
            }
        } catch (error) {
            message.error(error.message);
            detectionStore.setPreparing();
        }
    };

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
                            disabled={!detectionStore.isDone()}
                            checked={fillLeft}
                            onChange={(v) => {
                                setFillLeft(v);
                                setOpacityLeft(1);
                            }}
                        />
                        <h4>只显示遮罩(右)</h4>
                        <Switch
                            disabled={!detectionStore.isDone()}
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
                        <Button
                            disabled={imageStore.selectedImages.length < 2}
                            loading={detecting}
                            onClick={handleDetection}
                            style={{ width: '100%' }}
                            type="primary"
                        >
                            开始检测
                        </Button>
                        <Button
                            disabled={!detectionStore.isDone()}
                            style={{ width: '100%' }}
                        >
                            保存结果(左)
                        </Button>
                        <Button
                            disabled={!detectionStore.isDone()}
                            style={{ width: '100%' }}
                        >
                            保存结果(右)
                        </Button>
                    </Space>
                </Col>
                <Col span={10}>
                    <div className="change-slider">
                        透明度
                        <Slider
                            disabled={!detectionStore.isDone()}
                            min={0}
                            max={1}
                            step={0.02}
                            value={opacityLeft}
                            onChange={(value) => setOpacityLeft(value)}
                        />
                    </div>
                    {imageStore.selectedImages.length > 0 ? (
                        <ImageCanvas imageNode={imageNodeLeft}>
                            {detectionStore.isDone() && (
                                <Mask
                                    opacity={opacityLeft}
                                    width={imageNodeLeft.width}
                                    height={imageNodeLeft.height}
                                    imgSrc={maskSrcLeft}
                                    fill={fillLeft}
                                />
                            )}
                        </ImageCanvas>
                    ) : (
                        <FileUploader />
                    )}
                </Col>
                <Col span={10}>
                    <div className="change-slider">
                        透明度
                        <Slider
                            disabled={!detectionStore.isDone()}
                            min={0}
                            max={1}
                            step={0.02}
                            value={opacityRight}
                            onChange={(value) => setOpacityRight(value)}
                        />
                    </div>
                    {imageStore.selectedImages.length > 1 ? (
                        <ImageCanvas imageNode={imageNodeRight}>
                            {detectionStore.isDone() && (
                                <Mask
                                    opacity={opacityRight}
                                    width={imageNodeRight.width}
                                    height={imageNodeRight.height}
                                    imgSrc={maskSrcRight}
                                    fill={fillRight}
                                />
                            )}
                        </ImageCanvas>
                    ) : (
                        <FileUploader single={false} />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ChangeDetection;
