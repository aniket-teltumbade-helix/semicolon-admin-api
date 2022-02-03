import { IsEmail, IsNotEmpty, Max, Min } from "class-validator";

export class VerifyCandidateDto {
    candidate_id: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Min(6)
    @Max(6)
    pin: string;
}