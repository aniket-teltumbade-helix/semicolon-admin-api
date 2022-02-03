import { IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";

export class CreateCandidateDto {
    candidate_id: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    name: string;
    contact: string;
    admin_id: string;
}
