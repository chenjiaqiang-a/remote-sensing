import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Layer, Stage, Image, Group } from 'react-konva';

let observer = null;

const ImageCanvas = ({ imageNode, children, stageRef }) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [scale, setScale] = useState(1);
    const containerRef = useRef(null);
    // const stageRef = useRef(null);

    useEffect(() => {
        const result = Math.min(
            width / imageNode.width,
            height / imageNode.height,
            10
        );
        setScale(result > 1e-3 ? result : 1e-3);
    }, [height, width, imageNode.width, imageNode.height]);

    useEffect(() => {
        if (observer) {
            observer.disconnect();
        }
        observer = new ResizeObserver(() => {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            setWidth(containerWidth);
            setHeight(containerHeight);
        });
        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="rs-image-canvas">
            <div ref={containerRef} className="canvas-display">
                <Stage width={width} height={height}>
                    <Layer ref={stageRef} scaleX={scale} scaleY={scale}>
                        <Group
                            draggable
                            x={(width / scale - imageNode.width) / 2}
                            y={(height / scale - imageNode.height) / 2}
                            onDragEnd={() => {}}
                        >
                            <Image image={imageNode} />
                            {children}
                        </Group>
                    </Layer>
                </Stage>
            </div>
            <div className="scale-btn">
                <Space>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setScale(scale * 1.1)}
                    />
                    <Button
                        icon={<MinusOutlined />}
                        type="primary"
                        onClick={() => setScale(scale * 0.91)}
                    />
                </Space>
            </div>
        </div>
    );
};

export default ImageCanvas;
