import { IsNotEmpty } from "class-validator";

export class CreateSubmitProgramDto {

    @IsNotEmpty()
    script: string;

    @IsNotEmpty()
    contest_id: string;

    @IsNotEmpty()
    prog_id: string;

    @IsNotEmpty()
    candidate_id: string;

    @IsNotEmpty()
    language: 'c' | 'cpp' | 'python' | 'javascript' | 'java';
}
