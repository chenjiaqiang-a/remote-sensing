import { useState } from "react";

const DetectionStatus = {
    Preparing: 0,
    Detecting: 1,
    Done: 2,
};

const useDetectionStore = () => {
    const [status, setStatus] = useState(DetectionStatus.Preparing);
    return {
        status,
        isPreParing: () => {
            return status === DetectionStatus.Preparing;
        },
        setPreparing: () => {
            setStatus(DetectionStatus.Preparing);
        },
        isDetecting: () => {
            return status === DetectionStatus.Detecting;
        },
        setDetecting: () => {
            setStatus(DetectionStatus.Detecting);
        },
        isDone: () => {
            return status === DetectionStatus.Done;
        },
        setDone: () => {
            setStatus(DetectionStatus.Done);
        },
    }
};

export default useDetectionStore;