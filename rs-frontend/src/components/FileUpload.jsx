import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useUpload } from '../hooks';

const FileUploader = ({ single = true }) => {
    const uploadConfig = useUpload(single);
    return (
        <div className="rs-file-uploader">
            <Upload.Dragger {...uploadConfig}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                <p className="ant-upload-hint">
                    支持的文件有 *.jpg, *jpeg, *.png
                    等常见图片格式，请不要上传超过20MB的图片文件
                </p>
            </Upload.Dragger>
        </div>
    );
};

export default FileUploader;
