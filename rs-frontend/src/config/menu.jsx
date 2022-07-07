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
        label: '目标提取',
    },
    {
        key: 'change-detection',
        icon: <ChangeIcon />,
        label: '变化检测',
    },
    {
        key: 'object-detection',
        icon: <ObjectIcon />,
        label: '目标检测',
    },
    {
        key: 'feature-classification',
        icon: <ClassificationIcon />,
        label: '地物分类',
    },
];
