import { useState } from "react";

// const imgObj = {
//     id: 'number',
//     filename: 'string',
//     src: 'base64',
// };

const useImageStore = () => {
    const [imageList, setImageList] = useState([]);
    const [selectedImages, setSelectedImages] = useState([])

    return {
        imageList,
        selectedImages,
        changeSelectedImage: (imgObj) => {
            setSelectedImages([imgObj]);
            if (!imageList.find(img => img.id === imgObj.id)) {
                setImageList([imgObj, ...imageList]);
            }
        },
        addSelectedImage: (imgObj) => {
            setSelectedImages([...selectedImages, imgObj]);
            if (!imageList.find(img => img.id === imgObj.id)) {
                setImageList([imgObj, ...imageList]);
            }
        },
        setImageList,
    }
};

export default useImageStore;