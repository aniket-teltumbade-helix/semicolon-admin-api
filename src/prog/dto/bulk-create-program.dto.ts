import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { CreateProgramDto } from "./create_program.dto";

export class CreateBulkProgram {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProgramDto)
    programs: Array<CreateProgramDto>
}