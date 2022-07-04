import { useEffect } from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import ChangeDetection from '../pages/ChangeDetection';
import FeatureClassification from '../pages/FeatureClassification';
import FindPassword from '../pages/FindPassword';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ObjectDetection from '../pages/ObjectDetection';
import Platform from '../pages/Platform';
import TargetExtraction from '../pages/TargetExtraction';
import UserInfo from '../pages/UserInfo';

export const routes = [
    {
        key: '/',
        index: true,
        element: <Home />,
    },
    {
        key: '/login',
        path: 'login',
        element: <Login />,
    },
    {
        key: '/user-info',
        path: 'user-info',
        guard: true,
        element: <UserInfo />,
    },
    {
        key: '/find-password',
        path: 'find-password',
        element: <FindPassword />,
    },
    {
        key: '/platform',
        path: 'platform',
        guard: true,
        element: <Platform />,
        children: [
            {
                key: '/platform/target-extraction',
                path: 'target-extraction',
                guard: true,
                element: <TargetExtraction />,
            },
            {
                key: '/platform/change-detection',
                path: 'change-detection',
                guard: true,
                element: <ChangeDetection />,
            },
            {
                key: '/platform/object-detection',
                path: 'object-detection',
                guard: true,
                element: <ObjectDetection />,
            },
            {
                key: '/platform/feature-classification',
                path: 'feature-classification',
                guard: true,
                element: <FeatureClassification />,
            },
            {
                key: '/platform/',
                index: true,
                element: <Navigate to="/platform/target-extraction" replace />,
            },
        ],
    },
    {
        key: '/*',
        path: '*',
        element: <Navigate to="/" replace />,
    },
];

const RedirectToLogin = () => {
    const nav = useNavigate();
    useEffect(() => {
        message.info('您需要登录后才能访问该页面！');
        nav('/login');
    });
    return null;
};

export function renderRoutes(routes, isLogin) {
    const renderRoute = (route) => {
        if (route.index) {
            return <Route key={route.key} index element={route.element} />;
        }
        return (
            <Route key={route.key} path={route.path} element={route.element}>
                {route.children && renderRoutes(route.children, isLogin)}
            </Route>
        );
    };
    return routes.map((route) => {
        if (route.guard && !isLogin) {
            if (route.index) {
                return (
                    <Route
                        key={route.key}
                        index
                        element={<RedirectToLogin />}
                    />
                );
            }
            return (
                <Route
                    key={route.key}
                    path={route.path}
                    element={<RedirectToLogin />}
                >
                    {route.children && renderRoutes(route.children, isLogin)}
                </Route>
            );
        }
        if (route.path && route.path === 'login' && isLogin) {
            return (
                <Route key={route.key} path={route.path} element={<Navigate to="/" replace />} />
            );
        }
        return renderRoute(route);
    });
}
