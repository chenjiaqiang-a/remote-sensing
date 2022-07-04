import { Layout } from 'antd';
import { useContext } from 'react';
import { Routes } from 'react-router-dom';

import CustomHeader from './components/CustomHeader';
import { renderRoutes, routes } from './config/routes';
import { Context } from './store';

function App() {
    const {
        userStore: { userInfo },
    } = useContext(Context);
    return (
        <Layout className="rs-app">
            <CustomHeader />
            <Routes>{renderRoutes(routes, userInfo.isLogin)}</Routes>
        </Layout>
    );
}

export default App;
