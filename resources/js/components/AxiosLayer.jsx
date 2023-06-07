import axios from "axios";
import SnackBarContext from "../contexts/SnackBarContext";
import React, { useContext } from "react";

export default function AxiosLayer({ children }) {

    const { handleOpen, setMessage } = useContext(SnackBarContext);
    // Axios interceptors
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {

            if (error.response.status >= 400 && error.response.status <= 500) {
                setMessage(error.response.data.mensaje || error.response.data.message);
                handleOpen(true);
            }
        }
    );
    return (
        <>
            {children}
        </>
    )
}