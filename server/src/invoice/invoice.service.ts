import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import {
    CreateInvoiceDto,
    InvoiceDto,
    PaginationDTO,
    UpdateInvoiceDTO,
} from './dto';

@Injectable()
export class InvoiceService {
    constructor(private prisma: PrismaService) {}

    async createInvoice(user: User, createInvoiceDTO: CreateInvoiceDto) {
        const invoiceData = {
            customerId: user.id,
            dueDate: createInvoiceDTO.dueDate,
            title: createInvoiceDTO.title,
            vendor: createInvoiceDTO.vendor,
            description: createInvoiceDTO.description,
            totalAmount: createInvoiceDTO.totalAmount,
        };
        return this.prisma.invoice.create({
            data: invoiceData,
        });
    }

    async getInvoice(userId: number, invoiceId: number) {
        const invoice = await this.prisma.invoice.findFirst({
            where: {
                id: invoiceId,
            },
        });

        if (!invoice) {
            throw new Error('Invoice not found');
        }
        if (invoice.customerId !== userId) {
            throw new Error('You do not have permission to view this invoice');
        }

        return invoice;
    }

    async getAllInvoices(userId: number) {
        return this.prisma.invoice.findMany({
            where: {
                customerId: userId,
            },
            orderBy: {
                dueDate: 'asc',
            },
        });
    }

    async getAllInvoicesWithPagination(
        userId: number,
        page: number,
        limit: number,
    ): Promise<PaginationDTO> {
        const safePage = page < 0 ? 0 : page;
        const safeLimit = Math.max(1, limit);

        const invoices = await this.prisma.invoice.findMany({
            where: {
                customerId: userId,
            },
            orderBy: {
                dueDate: 'asc',
            },
            skip: safePage * safeLimit,
            take: safeLimit,
        });

        const totalInvoices = await this.prisma.invoice.count({
            where: {
                customerId: userId,
            },
        });

        return {
            rows: invoices as InvoiceDto[],
            rowCount: totalInvoices,
            pageCount: Math.ceil(totalInvoices / limit),
        };
    }

    async updateInvoice(
        userId: number,
        invoiceId: number,
        invoice: UpdateInvoiceDTO,
    ) {
        // use partial?
        const existingInvoice = await this.prisma.invoice.findUnique({
            where: { id: invoiceId, customerId: userId },
        });

        if (!existingInvoice) {
            throw new NotFoundException(
                `Invoice with ID ${invoiceId} not found`,
            );
        }

        return this.prisma.invoice.update({
            where: {
                id: invoiceId,
            },
            data: {
                ...invoice,
            },
        });
    }

    async deleteInvoice(userId: number, invoiceId: number) {
        const existingInvoice = await this.prisma.invoice.findUnique({
            where: { id: invoiceId, customerId: userId },
        });

        if (!existingInvoice) {
            throw new NotFoundException(
                `Invoice with ID ${invoiceId} not found`,
            );
        }

        await this.prisma.invoice.delete({
            where: {
                id: invoiceId,
            },
        });

        return { message: `Invoice with ID ${invoiceId} deleted successfully` };
    }
}
