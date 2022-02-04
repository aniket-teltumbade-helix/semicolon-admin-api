import { IsNotEmpty } from "class-validator";

export class CreateProgramDto {

    @IsNotEmpty()
    question: string;

    @IsNotEmpty()
    input: string;

    @IsNotEmpty()
    output: string;

    @IsNotEmpty()
    time: number;

    @IsNotEmpty()
    points: number;

    @IsNotEmpty()
    contest_id: string;
}
export class CreateProgramResponseDto {
    prog_id: string;
    input: string;
    output: string;
    time: number;
    points: number;
    contest_id: string;
}