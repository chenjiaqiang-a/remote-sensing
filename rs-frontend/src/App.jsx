import { useState } from 'react';
import { Layout } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';

import CustomHeader from './components/CustomHeader';

import Home from './pages/Home';
import Login from './pages/Login';
import Platform from './pages/Platform';
import TargetExtraction from './pages/TargetExtraction';
import ChangeDetection from './pages/ChangeDetection';
import ObjectDetection from './pages/ObjectDetection';
import FeatureClassification from './pages/FeatureClassification';
import loginContext from './context/loginContext';
import UserInfo from './pages/UserInfo';
import FindPassword from './pages/FindPassword';

function App() {
    const [loginStatus, setLoginStatus] = useState(true);
    return (
        <loginContext.Provider value={{loginStatus, setLoginStatus}}>
            <Layout className="rs-app">
                <CustomHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="user-info" element={<UserInfo />} />
                    <Route path="find-password" element={<FindPassword />} />
                    <Route path="platform" element={<Platform />}>
                        <Route path="target-extraction" element={<TargetExtraction />} />
                        <Route path="change-detection" element={<ChangeDetection />} />
                        <Route path="object-detection" element={<ObjectDetection />} />
                        <Route path="feature-classification" element={<FeatureClassification />} />
                        <Route index element={<Navigate to="target-extraction" replace />} />
                        <Route path="*" element={<Navigate to="target-extraction" replace />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Layout>
        </loginContext.Provider>
    );
}

export default App;
