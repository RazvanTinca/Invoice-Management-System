import {InvoiceApi, type InvoiceDto, type PaginationDTO} from "../api-client";
import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";


const useInvoiceService = () => {

    const axiosPrivate = useAxiosPrivate()

    const controller = new InvoiceApi(undefined, "", axiosPrivate);

    const getAllInvoices = async () => {
        const response = await controller.invoiceControllerGetAllInvoices();

        return response.data;
    }

    const getInvoiceById = async (id: number): Promise<InvoiceDto> => {
        const response = await controller.invoiceControllerGetInvoice(id);

        return response.data;
    }

    const getAllInvoicesWithPagination = async (page: number, limit: number): Promise<PaginationDTO> => {
        const response = await controller.invoiceControllerGetAllInvoicesWithPagination(page, limit);

        return response.data;
    }


    return {getAllInvoices, getInvoiceById, getAllInvoicesWithPagination}
}

export default useInvoiceService