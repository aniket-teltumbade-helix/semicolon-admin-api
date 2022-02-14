import { IsNotEmpty } from 'class-validator';

export class CreateTestCaseDto {
  @IsNotEmpty()
  input: string;

  @IsNotEmpty()
  output: string;

  @IsNotEmpty()
  program_id: string;
}
