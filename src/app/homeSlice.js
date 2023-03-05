import { updateAxiosAccessToken } from "api/axiosClient";
import homeApi from "api/homeApi";
import PreferenceKeys from "general/constants/PreferenceKey";
import ToastHelper from "general/helpers/ToastHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkDeleteHome = createAsyncThunk(
    "home/delete-home",
    async (params) => {
        const res = await homeApi.deleteHome(params);
        console.log(res);
        return res;
    }
);

export const thunkUpdateHomeData = createAsyncThunk(
    "home/update-home-data",
    async (params) => {
        const res = await homeApi.updateHomeData(params);
        console.log(res);
        return res;
    }
);

export const thunkGetHomesList = createAsyncThunk(
    "home/homes-list",
    async (params) => {
        const res = await homeApi.getHomesList(params);
        return res;
    }
);


const homeSlice = createSlice({
    name: "home",
    initialState: {
        isUpdatingHomeData: false,
        isDeletingHome: false,
        isGettingDataList: false,
        homesList: [],
    },
    reducers: {
        updateHomesListData: (state, action) => {
            return {
                ...state,
                homesList: [
                    ...state.homesList,
                    ...action.payload,
                ],
            };
        },
    },
    extraReducers: {
        //Delete Home
        [thunkDeleteHome.pending]: (state, action) => {
            state.isDeletingHome = true;
        },

        [thunkDeleteHome.rejected]: (state, action) => {
            state.isDeletingHome = false;
        },

        [thunkDeleteHome.fulfilled]: (state, action) => {
            state.isDeletingHome = false;
        },
        
        //Get  Homes List
        [thunkGetHomesList.pending]: (state, action) => {
            state.isGettingDataList = true;
        },

        [thunkGetHomesList.rejected]: (state, action) => {
            state.isGettingDataList = false;
        },

        [thunkGetHomesList.fulfilled]: (state, action) => {
            state.isGettingDataList = false;
            const { result , otherHomesList } = action.payload;
            state.homesList = otherHomesList;
        },

        //Update Home Data
        [thunkUpdateHomeData.pending]: (state, action) => {
            state.isUpdatingHomeData = true;
        },
        [thunkUpdateHomeData.rejected]: (state, action) => {
            state.isUpdatingHomeData = false;
        },
        [thunkUpdateHomeData.fulfilled]: (state, action) => {
            state.isUpdatingHomeData = false;
        },
    },
});

const { reducer, actions } = homeSlice;
export const { updateHomesListData } = actions;
export default reducer;
