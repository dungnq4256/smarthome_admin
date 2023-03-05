import axiosClient from "./axiosClient";

const homeApi = {
    //delete home
    deleteHome: (params) => {
        const url = '/home/delete';
        return axiosClient.delete(url, {params});
    },

    // update home data
    updateHomeData: (params) => {
        const url = '/home/update';
        return axiosClient.put(url, params);
    },

    //get homes list 
    getHomesList: (params) => {
        const url = '/home/find';
        return axiosClient.get(url, {params});
    },

};

export default homeApi;
