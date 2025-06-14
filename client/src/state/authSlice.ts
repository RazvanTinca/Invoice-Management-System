import {createSlice} from "@reduxjs/toolkit";


interface AuthState {
    email: string;
    fullName?: string;
    accessToken: string;
}

const localStorageAuth = localStorage.getItem("auth");

const initialState: AuthState = localStorageAuth !== null ? JSON.parse(localStorageAuth) : {
    email: '',
    fullName: undefined,
    accessToken: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.fullName = action.payload.fullName;

            localStorage.setItem('auth', JSON.stringify(action.payload));
        },
        clearAuth: (state) => {
            state.email = '';
            state.accessToken = '';
            state.fullName = undefined;
        }
    }
})

export default authSlice.reducer;
export const {setAuth, clearAuth} = authSlice.actions;