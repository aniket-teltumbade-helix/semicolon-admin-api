export class CreateProgramDto {
    question: string;
    input: string;
    output: string;
    time: number;
    points: number;
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