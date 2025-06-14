
import {jwtDecode, type JwtPayload} from "jwt-decode";
import {AuthApi} from "../api-client";
import axios from "../app/axios.ts";
import {useDispatch} from "react-redux";
import {setAuth} from "../state/authSlice.ts";

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

type CustomJwtPayload = JwtPayload & {
    email: string;
    fullName: string;
}

interface Token {
    accessToken: string;
}

const useAuthService = () => {

    const authController = new AuthApi(undefined, undefined, axios);

    const dispatch = useDispatch();

    const login = async ({email, password}: LoginRequest) => {

        const response = await authController.authControllerLogin({email, password}, {withCredentials: true});

        // @ts-expect-error - type mismatch
        const token: Token = response.data;

        const decodedToken = jwtDecode<CustomJwtPayload>(token.accessToken)
        const tokenEmail = decodedToken.email;

        dispatch(setAuth({email: tokenEmail, accessToken: token.accessToken, fullName: decodedToken.fullName}))

        return token
    }

    const refresh = async () => {
        const response = await authController.authControllerRefresh({withCredentials: true})

        // @ts-expect-error - type mismatch
        const token: Token = response.data;

        const decodedToken = jwtDecode<CustomJwtPayload>(token.accessToken)
        const tokenEmail = decodedToken.email;

        dispatch(setAuth({email: tokenEmail, accessToken: token.accessToken, fullName: decodedToken.fullName}))

        return token
    }

    const register = async ({email, password, firstName, lastName}: RegisterRequest) => {
        const response = await authController.authControllerRegister({email, password, firstName, lastName}, {withCredentials: true});

        // @ts-expect-error - type mismatch
        const token: Token = response.data;

        const decodedToken = jwtDecode<CustomJwtPayload>(token.accessToken)
        const tokenEmail = decodedToken.email;

        dispatch(setAuth({email: tokenEmail, accessToken: token.accessToken, fullName: decodedToken.fullName}))

        return token
    }

    const logout = async () => {
        console.log('logout')
    }

    return {login, refresh, logout, register}
}

export default useAuthService