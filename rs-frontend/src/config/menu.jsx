import { Link } from 'react-router-dom';
import {
    ExtractionIcon,
    ChangeIcon,
    ObjectIcon,
    ClassificationIcon,
} from '../components/icons';

export const platformMenu = [
    {
        key: 'target-extraction',
        icon: <ExtractionIcon />,
        label: <Link to="/platform/target-extraction">目标提取</Link>,
    },
    {
        key: 'change-detection',
        icon: <ChangeIcon />,
        label: <Link to="/platform/change-detection">变化检测</Link>,
    },
    {
        key: 'object-detection',
        icon: <ObjectIcon />,
        label: <Link to="/platform/object-detection">目标检测</Link>,
    },
    {
        key: 'feature-classification',
        icon: <ClassificationIcon />,
        label: <Link to="/platform/feature-classification">地物分类</Link>,
    },
];
