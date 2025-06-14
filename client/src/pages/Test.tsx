import {InvoiceApi} from "../api-client";
import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";
import {useEffect} from "react";

export default function Test() {

    const axiosPrivate = useAxiosPrivate();

    const invoiceApi = new InvoiceApi(undefined, "", axiosPrivate)

    const getAllInvoices = async () => {
        const response = await invoiceApi.invoiceControllerGetAllInvoices();

        console.log("Get All Invoices Response:", response);
    }

    useEffect(() => {
        if (axiosPrivate){
            getAllInvoices().catch(error => {
                console.error("Error fetching invoices:", error);
            });
        }
    }, [axiosPrivate]);

    return (
        <>
            
        </>
    )
}