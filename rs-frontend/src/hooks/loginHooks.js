import {
    useState
} from "react";
import request from "../request/request";
import {
    toLoginParam,
    toRegisterParam
} from "../utils/paramMaps";

export function useRegister() {
    const [pending, setPending] = useState(false);

    const handleRegister = (userInfo) => {
        setPending(true);
        const data = {
            ...userInfo,
            username: userInfo.email.split('@')[0],
        }
        return new Promise((resolve, reject) => {
            request('/user/register', toRegisterParam(data))
                .then(res => {
                    if (res.status === 200) {
                        setPending(false);
                        resolve(res.data);
                    } else {
                        throw Error('请求出错，请再次尝试！');
                    }
                })
                .catch(err => {
                    setPending(false);
                    reject(err);
                });
        });
    }

    return {
        handleRegister,
        pending
    };
}

export function useLogin() {
    const [pending, setPending] = useState(false);

    const handleLogin = (username, password) => {
        setPending(true);
        const data = {
            username,
            password,
        };
        return new Promise((resolve, reject) => {
            request('/user/login', toLoginParam(data))
                .then(res => {
                    if (res.status === 200) {
                        setPending(false);
                        resolve(res.data);
                    } else {
                        throw Error('请求出错，请再次尝试！');
                    }
                })
                .catch(err => {
                    setPending(false);
                    reject(err);
                });
        });

    }

    return {
        handleLogin,
        pending
    };
}