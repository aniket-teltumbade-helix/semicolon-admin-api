import { PartialType } from '@nestjs/swagger';
import { CreateAuthDTO } from 'src/auth/dto/create-auth.dto';

export class UpdateTestDto extends PartialType(CreateAuthDTO) {
    test_name: string;
}
