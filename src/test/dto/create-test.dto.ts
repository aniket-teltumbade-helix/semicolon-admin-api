import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateTestDto {
    @IsNotEmpty()
    admin_id: string;

    @IsNumber()
    @Min(30)
    duration: number;
}
