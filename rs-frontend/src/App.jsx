import { useState } from 'react';
import { Layout } from 'antd';
import { Routes } from 'react-router-dom';

import CustomHeader from './components/CustomHeader';

import loginContext from './store/loginContext';
import { renderRoutes, routes } from './config/routes';

function App() {
    const [loginStatus, setLoginStatus] = useState(true);
    return (
        <loginContext.Provider value={{loginStatus, setLoginStatus}}>
            <Layout className="rs-app">
                <CustomHeader />
                <Routes>
                    {renderRoutes(routes, loginStatus)}
                </Routes>
            </Layout>
        </loginContext.Provider>
    );
}

export default App;
