import {type CellContext, createColumnHelper, flexRender, getCoreRowModel, type HeaderContext, useReactTable} from "@tanstack/react-table";
import React, {useState} from "react";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

import useInvoiceService from "../services/invoiceService.tsx";
import type {InvoiceDto} from "../api-client";
import Modal from "./ui/Modal.tsx";
import {FaAnglesLeft, FaAnglesRight} from "react-icons/fa6";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import TablePagination from "./util/TablePagination.tsx";

const columnHelper = createColumnHelper<InvoiceDto>()

const columns = [
    {
        accessorKey: "select",
        id: 'select',
        header: (info: HeaderContext<InvoiceDto, unknown>) => (
            <input
                type="checkbox"
                checked={info.table.getIsAllRowsSelected()}
                onChange={info.table.getToggleAllRowsSelectedHandler()}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
        ),
        cell: (info: CellContext<InvoiceDto, unknown>) => (
            <input
                type="checkbox"
                checked={info.row.getIsSelected()}
                onChange={info.row.getToggleSelectedHandler()}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
        ),
    },
    columnHelper.accessor("createdAt", {
        header: "Created At",
        cell: (info) => new Date(info.getValue()).toLocaleDateString('en-US')
    }),
    columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
    }),
    // columnHelper.accessor("description", {
    //     header: "Description",
    //     cell: (info) => info.getValue(),
    // }),
    columnHelper.accessor("vendor", {
        header: "Vendor",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("paid", {
        header: "Status",
        cell: (info) =>
            info.getValue() ? (
                <span className="text-green-500">Paid</span>
            ) : (
                <span className="text-amber-500">Open</span>
            ),
    }),
    columnHelper.accessor("dueDate", {
        header: "Due Date",
        cell: (info) => new Date(info.getValue()).toLocaleDateString('en-US'),
    }),
    columnHelper.accessor("totalAmount", {
        header: "Total",
        cell: (info) => "$" + info.getValue(),
    }),
]

export default function InvoiceTable() {

    const {getAllInvoicesWithPagination, getInvoiceById} = useInvoiceService();

    const [invoiceSelectedId, setInvoiceSelectedId] = useState<number | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });

    const invoices = useQuery({
        queryKey: ['invoices', pagination],
        queryFn: async () => {
            return getAllInvoicesWithPagination(pagination.pageIndex, pagination.pageSize);
        },
        placeholderData: keepPreviousData,
    })

    const selectedInvoice = useQuery({
        queryKey: ['invoice', invoiceSelectedId],
        queryFn: async () => {
            if (invoiceSelectedId) {
                return getInvoiceById(invoiceSelectedId);
            }
        },
        enabled: !!invoiceSelectedId
    })

    const defaultData = React.useMemo(() => [], [] )

    const table = useReactTable({
        data: invoices.data?.rows ?? defaultData,
        columns,
        state: {
            pagination
        },
        rowCount: invoices.data?.rowCount,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        // getPaginationRowModel: getPaginationRowModel(),
    })


    return (
        <>
            <div className={"w-full text-white bg-gray-900 rounded-2xl overflow-hidden flex flex-col"}>
                <table className="w-full h-full">
                    <thead className={"bg-gray-700 text-sm uppercase "}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className={"items-center"}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} colSpan={header.colSpan} className={`px-5 py-5 text-left `}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id} className={` ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>
                            {row.getVisibleCells().map((cell, cellIndex) => (
                                <td key={cell.id} className={`px-5 py-2 ${cellIndex > 0 ? "cursor-pointer" : ""}`} onClick={() => {
                                    if (cellIndex > 0) {
                                        setInvoiceSelectedId(row.original.id);
                                        setShowDetails(true);
                                    }
                                }}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex w-full p-6 items-center gap-5">
                    <div className="flex">
                        Showing {(table.getState().pagination.pageIndex * table.getRowModel().rows.length)}-{(table.getState().pagination.pageIndex * table.getRowModel().rows.length + table.getRowModel().rows.length)} of {table.getRowCount().toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                        Rows
                        <select id="rows" value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))} className="bg-gray-700 border-0 ring-0 rounded h-8 w-12">
                            {[2, 3, 10, 20, 30, 40, 50].map(pageSize => (<option key={pageSize} value={pageSize}>{pageSize}</option>))}
                        </select>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex">
                        <div className={"flex rounded-xl items-center overflow-hidden"}>
                            <button className={"pag pag-button"} onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}><FaAnglesLeft/></button>
                            <button className={"pag pag-button"} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><FaAngleLeft/></button>

                            <TablePagination
                                numberOfPagesToShow={5}
                                alwaysKeepNumberOfPages={true}
                                totalPageCount={table.getPageCount()}
                                pageIndex={table.getState().pagination.pageIndex + 1}
                                render={(page, isSelected) => (
                                    <button className={`pag ${isSelected ? "pag-selected" : ""}`} onClick={() => table.setPageIndex(page - 1)}>{page}</button>
                                )}
                            />

                            <button className={"pag pag-button"} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><FaAngleRight/></button>
                            <button className={"pag pag-button"} onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}><FaAnglesRight/></button>

                        </div>
                    </div>
                </div>
            </div>
            <Modal id={"details"} isOpen={showDetails} title={"Invoice Details"} onClose={() => setShowDetails(false)}>
                {selectedInvoice.isLoading ? (
                    <div className="text-center text-gray-400">Loading...</div>
                ) : selectedInvoice.isError ? (
                    <div className="text-red-500">Error loading invoice details</div>
                ) : selectedInvoice.data ? (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">{selectedInvoice.data.title}</h3>
                        <p className="mb-2"><strong>Vendor:</strong> {selectedInvoice.data.vendor}</p>
                        <p className="mb-2"><strong>Description:</strong> {selectedInvoice.data.description}</p>
                        <p className="mb-2"><strong>Total Amount:</strong> ${selectedInvoice.data.totalAmount}</p>
                        <p className="mb-2"><strong>Status:</strong> {selectedInvoice.data.paid ? "Paid" : "Open"}</p>
                        <p className="mb-2"><strong>Due Date:</strong> {new Date(selectedInvoice.data.dueDate).toLocaleDateString('en-US')}</p>
                    </div>
                ) : (
                    <div>No invoice selected</div>
                )}
            </Modal>
        </>
    )
}