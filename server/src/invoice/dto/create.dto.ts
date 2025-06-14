import {
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInvoiceDto {
    @IsString()
    @ApiProperty()
    title: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    vendor: string;

    @Type(() => Date)
    @IsDate()
    @ApiProperty()
    invoiceDate: Date;

    @Type(() => Date)
    @IsDate()
    @ApiProperty()
    dueDate: Date;

    @IsNumber()
    @IsPositive()
    @ApiProperty()
    totalAmount: number;
}
