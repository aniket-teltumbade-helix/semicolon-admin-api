import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateMcqDto {

    @IsNotEmpty()
    question_number: number;

    @IsNotEmpty()
    question: string;

    @IsNotEmpty()
    a: string;

    @IsNotEmpty()
    b: string;

    @IsNotEmpty()
    c: string;

    @IsNotEmpty()
    d: string;

    @IsNotEmpty()
    answer: string;

    @IsNotEmpty()
    @IsNumber()
    points: number;
}

