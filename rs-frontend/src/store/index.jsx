import React, { useState } from 'react';

export const Context = React.createContext({
    userInfo: {},
    imageList: [],
    image: [],
    setUserInfo: () => {},
    setImageList: () => {},
    setImage: () => {},
});

export const Provider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [imageList, setImageList] = useState([]);
    const [image, setImage] = useState([]);
    return (
        <Context.Provider
            value={{
                userInfo,
                imageList,
                image,
                setUserInfo,
                setImageList,
                setImage,
            }}
        >
            {children}
        </Context.Provider>
    );
};
