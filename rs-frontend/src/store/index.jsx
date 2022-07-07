import React from 'react';
import getImageStore from './imageStore';
import getUserStore from './userStore';
import getDetectionStore from './detectionStore';

export const Context = React.createContext({
    userStore: {},
    imageStore: {},
    detectionStore: {},
});

export const Provider = ({ children }) => {
    const userStore = getUserStore();
    const imageStore = getImageStore();
    const detectionStore = getDetectionStore();
    return (
        <Context.Provider
            value={{
                userStore,
                imageStore,
                detectionStore,
            }}
        >
            {children}
        </Context.Provider>
    );
};
