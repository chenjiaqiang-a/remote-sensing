import {
    useState
} from "react";

const MODE = {
    'target-extraction': 0,
    'change-detection': 1,
    'object-detection': 2,
    'feature-classification': 3,
};

const useImageStore = () => {
    const [imageList, setImageList] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [mode, setMode] = useState(MODE['target-extraction']);

    return {
        imageList,
        selectedImages,
        isInMode: (m) => {
            return mode === MODE[m];
        },
        setMode: (mode) => {
            setMode(MODE[mode]);
        },
        changeSelectedImage: (imgObj) => {
            if (mode === MODE['change-detection'] && selectedImages.length > 1) {
                selectedImages.shift();
                selectedImages[1] = imgObj;
            } else if (mode === MODE['change-detection'] && selectedImages.length === 1) {
                selectedImages[1] = imgObj;
            } else {
                selectedImages[0] = imgObj;
            }

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