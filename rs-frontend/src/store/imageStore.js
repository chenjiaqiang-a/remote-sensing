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
            selectedImages[0] = imgObj;
            setSelectedImages([...selectedImages]);
            if (!imageList.find(img => img.id === imgObj.id)) {
                setImageList([imgObj, ...imageList]);
            }
        },
        addSelectedImage: (imgObj) => {
            selectedImages[1] = imgObj;
            setSelectedImages([...selectedImages]);
            if (!imageList.find(img => img.id === imgObj.id)) {
                setImageList([imgObj, ...imageList]);
            }
        },
        deleteImage: (id) => {
            setImageList(imageList.filter(item => item.id !== id));
            setSelectedImages(selectedImages.filter(item => item.id !== id));
        },
        setImageList,
        setSelectedImages,
    }
};

export default useImageStore;