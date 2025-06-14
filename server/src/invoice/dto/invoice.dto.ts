import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    customerId: number;

    @ApiProperty()
    invoiceDate: Date;

    @ApiProperty()
    dueDate: Date;

    @ApiProperty()
    paid: boolean;

    @ApiProperty()
    vendor: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false, nullable: true })
    description?: string;

    @ApiProperty()
    totalAmount: number;
}
