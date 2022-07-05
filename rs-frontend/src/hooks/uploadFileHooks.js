import {
    message
} from 'antd';
import {
    useContext,
    useState
} from 'react';
import {
    Context
} from '../store';

export function useUpload(single = true) {
    const [pending, setPending] = useState(false);
    const {
        imageStore
    } = useContext(Context);

    return {
        name: 'file',
        accept: 'image/*',
        maxCount: 1,
        disabled: pending,
        showUploadList: false,
        action: 'http://223.129.87.141:5000/upload/uploader',
        beforeUpload: () => {
            setPending(true);
            return true;
        },
        onChange: (info) => {
            setPending(false);
            const {
                status,
                uid,
                name,
                originFileObj: file
            } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} 上传成功`);

                const reader = new FileReader();
                reader.onload = (event) => {
                    const imgObj = {
                        id: uid,
                        filename: name,
                        src: event.target.result
                    };
                    if (single) {
                        imageStore.changeSelectedImage(imgObj);
                    } else {
                        imageStore.addSelectedImage(imgObj)
                    }
                };
                reader.readAsDataURL(file);
            } else if (status === 'error') {
                message.error(`${info.file.name} 上传失败`);
            }
        },
    };
}