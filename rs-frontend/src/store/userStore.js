import {
    useState
} from "react"
import store from 'store';

const useUserStore = () => {
    const localUserInfo = store.get('rs-userinfo') || {};

    const [userInfo, setUserInfo] = useState({
        email: "",
        username: "",
        password: "",
        phone: "",
        gender: "other",
        prefix: '86',
        remember: true,
        isLogin: false,
        ...localUserInfo,
    });

    return {
        userInfo,
        setLogin: ({
            email,
            password,
            remember
        }) => {
            password = remember ? password : '';
            const newUserInfo = {
                ...userInfo,
                email,
                password,
                remember,
                isLogin: true,
            };
            setUserInfo(newUserInfo);
            store.set('rs-userinfo', newUserInfo);
        },
        setLogout: () => {
            const newUserInfo = {
                ...userInfo,
                isLogin: false,
            };
            setUserInfo(newUserInfo);
            store.set('rs-userinfo', newUserInfo);
        },
    };
};

export default useUserStore;
