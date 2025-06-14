import {axiosPrivate} from "../app/axios";
import {useEffect} from "react";
import useAuthService from "../services/authService.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../state/store.ts";

const useAxiosPrivate = () => {
    const {refresh} = useAuthService();
    const {accessToken} = useSelector((state: RootState) => state.auth);

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {


                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }

                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {

                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken.accessToken}`;
                    return axiosPrivate(prevRequest);
                }

                console.log("Refresh token expired")

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;