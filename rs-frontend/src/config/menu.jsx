import { Link } from 'react-router-dom';

export const platformMenu = [
    {
        key: 'target-extraction',
        label: <Link to="/platform/target-extraction">目标提取</Link>,
    },
    {
        key: 'change-detection',
        label: <Link to="/platform/change-detection">变化检测</Link>,
    },
    {
        key: 'object-detection',
        label: <Link to="/platform/object-detection">目标检测</Link>,
    },
    {
        key: 'feature-classification',
        label: <Link to="/platform/feature-classification">地物分类</Link>,
    },
];
