import { PartialType } from '@nestjs/mapped-types';
import { ResumeDto } from './resume-dto';

// PartialType з бібліотеки @nestjs/mapped-types дозволяє передавати тільки ті поля, які треба оновити
export class UpdateResumeDto extends PartialType(ResumeDto) {}