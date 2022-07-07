import {
    useState
} from "react";
import request from "../request/request";
import {
    toDetectionParam
} from "../utils/paramMaps";

const MODE = {
    'TargetExtraction': 3,
    'ChangeDetection': 0,
    'ObjectDetection': 1,
    'FeatureClassification': 2,
};

const useDetection = (mode) => {
    const [pending, setPending] = useState(false);
    const handleDetection = (param) => {
        setPending(true);
        const data = {
            imgList: param.images,
            mode: MODE[mode],
            color: param.color,
        };
        console.log(toDetectionParam(data));
        return new Promise((resolve, reject) => {
            request('/detection', toDetectionParam(data))
                .then(res => {
                    if (res.status === 200) {
                        setPending(false);
                        resolve(res.data);
                    } else {
                        throw Error('请求出错，请再次尝试！');
                    }
                })
                .catch(err => {
                    setPending(false);
                    reject(err);
                });
        });
    };

    return {
        pending,
        handleDetection,
    };
}

export const useTargetExtraction = () => {
    const {
        pending,
        handleDetection
    } = useDetection('TargetExtraction');

    return {
        detecting: pending,
        handleDetection: (imgObj, color) => {
            const params = {
                images: [imgObj.filename],
                color: color,
            };
            return handleDetection(params);
        },
    };
};

export const useChangeDetection = () => {
    const {
        pending: pendingLeft,
        handleDetection: handleDetectionLeft,
    } = useDetection('ChangeDetection');

    const {
        pending: pendingRight,
        handleDetection: handleDetectionRight,
    } = useDetection('ChangeDetection');

    return {
        detecting: pendingLeft && pendingRight,
        handleDetection: (imgObjLeft, colorLeft, imgObjRight, colorRight) => {
            const paramsLeft = {
                images: [imgObjLeft.filename, imgObjRight.filename],
                color: colorLeft,
            };
            const paramsRight = {
                images: [imgObjLeft.filename, imgObjRight.filename],
                color: colorRight,
            };

            return Promise.all([
                handleDetectionLeft(paramsLeft),
                handleDetectionRight(paramsRight),
            ]);
        },
    }
};

export const useObjectDetection = () => {
    const {
        pending,
        handleDetection
    } = useDetection('ObjectDetection');

    return {
        detecting: pending,
        handleDetection: (imgObj, color) => {
            const params = {
                images: [imgObj.filename],
                color: color,
            };
            return handleDetection(params);
        },
    };
};

export const useFeatureClassification = () => {
    const {
        pending,
        handleDetection
    } = useDetection('FeatureClassification');

    return {
        detecting: pending,
        handleDetection: (imgObj, color) => {
            const params = {
                images: [imgObj.filename],
                color: color,
            };
            return handleDetection(params);
        },
    };
};
