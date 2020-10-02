const axios = require("axios");

axios.interceptors.request.use(

    function(config) {
        const jwtToken = localStorage.getItem("authorization");
        if (jwtToken) {
            config.headers["Authorization"] = jwtToken;
        }
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);