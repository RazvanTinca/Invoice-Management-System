import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { User } from '../auth/decorator';
import { Invoice, User as UserEntity } from '@prisma/client';

import { InvoiceService } from './invoice.service';
import { JwtGuard } from '../auth/guard';
import { CreateInvoiceDto, UpdateInvoiceDTO } from './dto';
import { ApiResponse } from '@nestjs/swagger';
import { InvoiceDto, PaginationDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('invoice')
export class InvoiceController {
    constructor(private invoiceService: InvoiceService) {}

    // CRUD operations for invoices
    // Create operations
    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    createInvoice(
        @User() user: UserEntity,
        @Body() createInvoiceDTO: CreateInvoiceDto,
    ) {
        return this.invoiceService.createInvoice(user, createInvoiceDTO);
    }

    // Read operations
    @Get('/id/:id')
    @ApiResponse({ type: InvoiceDto })
    getInvoice(@User() user: UserEntity, @Param('id') id: number) {
        return this.invoiceService.getInvoice(user.id, Number(id));
    }

    @ApiResponse({ type: [InvoiceDto] })
    @Get('/all')
    getAllInvoices(@User() user: UserEntity): Promise<Invoice[]> {
        return this.invoiceService.getAllInvoices(user.id);
    }

    @Get('/all/pagination/:page/:limit')
    @ApiResponse({ type: PaginationDTO })
    getAllInvoicesWithPagination(
        @User() user: UserEntity,
        @Param('page') page: number,
        @Param('limit') limit: number,
    ) {
        return this.invoiceService.getAllInvoicesWithPagination(
            user.id,
            Number(page),
            Number(limit),
        );
    }

    // Update operations
    @Patch('/update/:id')
    updateInvoice(
        @User() user: UserEntity,
        @Param('id') id: number,
        @Body() updateInvoiceDTO: UpdateInvoiceDTO,
    ) {
        return this.invoiceService.updateInvoice(user.id, id, updateInvoiceDTO);
    }

    // Delete operations
    @Delete('/delete/:id')
    @HttpCode(HttpStatus.OK)
    deleteInvoice(@User() user: UserEntity, @Param('id') id: number) {
        return this.invoiceService.deleteInvoice(user.id, id);
    }
}
