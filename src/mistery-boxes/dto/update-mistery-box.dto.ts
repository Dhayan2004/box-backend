import { PartialType } from '@nestjs/swagger';
import { CreateMisteryBoxDto } from './create-mistery-box.dto';

export class UpdateMisteryBoxDto extends PartialType(CreateMisteryBoxDto) {}
