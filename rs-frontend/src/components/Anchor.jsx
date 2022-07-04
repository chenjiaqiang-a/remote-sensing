import { useState, useEffect, useRef } from 'react';
import { Group, Rect, Text } from 'react-konva';

const Anchor = ({ label = '', color, labelColor, anchorWidth, ...pos }) => {
    const textRef = useRef(null);
    const [textSize, setTextSize] = useState({ width: 0, height: 0 });
    const [shadow, setShadow] = useState(0);

    useEffect(() => {
        setTextSize({
            width: textRef.current.width() + anchorWidth * 2,
            height: textRef.current.height() + anchorWidth * 2,
        });
    }, [anchorWidth]);

    return (
        <Group
            x={pos.x}
            y={pos.y}
            onMouseEnter={() => setShadow(anchorWidth)}
            onMouseLeave={() => setShadow(0)}
        >
            <Rect
                width={pos.width}
                height={pos.height}
                shadowColor={color ? color : '#000'}
                shadowBlur={shadow}
                stroke={color ? color : '#000'}
                strokeWidth={anchorWidth ? anchorWidth : 4}
            />
            <Group>
                <Rect
                    shadowColor={color ? color : '#000'}
                    shadowBlur={shadow}
                    fill={color ? color : '#000'}
                    {...textSize}
                />
                <Text
                    ref={textRef}
                    x={anchorWidth}
                    y={anchorWidth}
                    text={label}
                    fontSize={4 * (anchorWidth ? anchorWidth : 4)}
                    fill={labelColor ? labelColor : '#fff'}
                />
            </Group>
        </Group>
    );
};

export default Anchor;
