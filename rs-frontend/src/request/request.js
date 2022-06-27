import axios from "axios";
import { requestConfig } from "../config/request";

const instance = axios.create(requestConfig);

const request = (path, data) => {
    return instance.post(path, data);
}

export default request;