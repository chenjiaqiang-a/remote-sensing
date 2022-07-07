import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import App from './App';
import { Provider } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider>
        <BrowserRouter>
            <ConfigProvider locale={zhCN}>
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </Provider>
);
