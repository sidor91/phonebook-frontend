import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const axiosInstance = axios.create({
	baseURL: "https://rest-api-phonebook-ttv1.onrender.com/",
});

export const setAuthHeader = (token) => {
	axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
	axiosInstance.defaults.headers.common.Authorization = "";
};

export const signupUser = createAsyncThunk(
	"users/signup",
	async (data, thunkAPI) => {
		try {
			const response = await axiosInstance.post("/users/register", data);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"users/login",
	async (credentials, thunkAPI) => {
		try {
			const response = await axiosInstance.post("/users/login", credentials);
			setAuthHeader(response.data.token);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const logoutUser = createAsyncThunk(
	"users/logout",
	async (_, thunkAPI) => {
		try {
			await axiosInstance.post("/users/logout");
			clearAuthHeader();
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const fetchCurrentUser = createAsyncThunk(
	"users/current",
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();
		const { token: stateToken } = state.auth;
		if (stateToken === null) {
			return thunkAPI.rejectWithValue();
		}
		setAuthHeader(stateToken);

		try {
			const response = await axiosInstance.get("/users/current");
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const updateUserById = createAsyncThunk(
	"users/update",
	async ({ data, id }, thunkAPI) => {
		try {
			const response = await axiosInstance.put(`/users/${id}`, data);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);


