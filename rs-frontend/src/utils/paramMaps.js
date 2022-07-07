export function toRegisterParam(params) {
    const data = {};
    data['username'] = params.username;
    data['phone'] = params.email;
    data['password'] = params.password;
    data['password1'] = params.confirm;
    return data;
}

export function toLoginParam(params) {
    const data = {};
    data['phone'] = params.email;
    data['password'] = params.password;
    return data;
}

export function toDetectionParam(params) {
    const data = {};
    data['pic_list'] = params.imgList;
    data['mode'] = params.mode;
    data['color'] = params.color;
    return data;
}