import React from 'react';
import getImageStore from './imageStore';
import getUserStore from './userStore';

export const Context = React.createContext({
    userStore: {},
    imageStore: {},
});

export const Provider = ({ children }) => {
    const userStore = getUserStore();
    const imageStore = getImageStore();
    return (
        <Context.Provider
            value={{
                userStore,
                imageStore,
            }}
        >
            {children}
        </Context.Provider>
    );
};
