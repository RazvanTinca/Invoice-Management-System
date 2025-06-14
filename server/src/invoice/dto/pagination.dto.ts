import { InvoiceDto } from './invoice.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDTO {
    @ApiProperty({ type: [InvoiceDto] })
    rows: InvoiceDto[];
    @ApiProperty()
    pageCount: number;
    @ApiProperty()
    rowCount: number;
}
