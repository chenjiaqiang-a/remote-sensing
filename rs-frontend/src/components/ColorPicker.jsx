import { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ color, onChange }) => {
    const [openPicker, setOpenPicker] = useState(false);
    return (
        <div className="rs-color-picker" style={{ color: color }}>
            <div className="picker-swatch" onClick={() => setOpenPicker(true)}>
                <div
                    className="picker-color"
                    style={{ backgroundColor: color }}
                />
            </div>
            {color}
            {openPicker && (
                <div className="picker-popover">
                    <div
                        className="picker-cover"
                        onClick={() => setOpenPicker(false)}
                    />
                    <SketchPicker
                        color={color}
                        onChange={(c) => onChange(c.hex)}
                    />
                </div>
            )}
        </div>
    );
};

export default ColorPicker;
