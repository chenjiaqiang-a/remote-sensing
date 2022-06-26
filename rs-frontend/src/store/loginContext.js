import React from "react"

const loginContext = React.createContext({
    loginStatus: false,
    setLoginStatus: () => {}
});

export default loginContext;