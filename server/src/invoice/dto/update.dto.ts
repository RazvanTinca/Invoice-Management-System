import {PartialType} from "@nestjs/swagger";
import {CreateInvoiceDto} from "./create.dto";

export class UpdateInvoiceDTO extends PartialType(CreateInvoiceDto) {
}