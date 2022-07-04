import { Image } from 'react-konva';

const Mask = ({ imgSrc, opacity, width, height, fill }) => {
    const imageNode = new window.Image(width, height);
    imageNode.src = imgSrc;

    return (
        <Image
            fill={fill ? 'black' : 'transparent'}
            opacity={opacity}
            image={imageNode}
        />
    );
};

export default Mask;
