import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateTestCaseDto } from './create-test-case.dto';

export class CreateBulkTestCasesDto {
  @IsArray()
  @ValidateNested()
  @Type(() => CreateTestCaseDto)
  testcases: Array<CreateTestCaseDto>;
}
