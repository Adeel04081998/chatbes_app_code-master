export const API_BASE_URL = "https://cibaksocketio.herokuapp.com/";
export const SOCKET_BASE_URL = "https://cibaksocketio.herokuapp.com/";

export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const SIGNUP_API = getApiUrl('User/signup');
export const GET_USERS = getApiUrl('User/users');
export const VERIFY_OTP = getApiUrl('User/otpVerify');