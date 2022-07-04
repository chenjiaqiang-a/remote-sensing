import {
    message
} from 'antd';

export function useUpload() {
    return {
        name: 'file',
        showUploadList: false,
        action: 'http://223.129.87.141:5000/upload/uploader',
        onChange(info) {
            const {
                status
            } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} 上传成功`);
            } else if (status === 'error') {
                message.error(`${info.file.name} 上传失败`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
}