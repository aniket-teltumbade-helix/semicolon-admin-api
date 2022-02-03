import { IsEmpty, IsNumber, Min } from "class-validator";

export class CreateTestDto {

    @IsEmpty()
    admin_id: string;

    @IsEmpty()
    contest_id: string;

    @IsNumber()
    @Min(300)
    duration: number;
}
