import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MisteryBoxesService } from './mistery-boxes.service';
import { CreateMisteryBoxDto } from './dto/create-mistery-box.dto';
import { UpdateMisteryBoxDto } from './dto/update-mistery-box.dto';

@Controller('mistery-boxes')
export class MisteryBoxesController {
  constructor(private readonly misteryBoxesService: MisteryBoxesService) {}

  @Post('create')
  async creacreateBoxte(@Body() box: CreateMisteryBoxDto) {
    return this.misteryBoxesService.createBox(box);
  }

  @Get('all')
  async findAll() {
    return this.misteryBoxesService.findAll();
  }

  @Get(':id')
  async findBox(@Param('id', ParseIntPipe) id: string) {
    return this.misteryBoxesService.findBox(+id);
  }

  @Patch('update/:id')
  async updateBox(
    @Param('id', ParseIntPipe) id: string,
    @Body() box: UpdateMisteryBoxDto,
  ) {
    return this.misteryBoxesService.updateBox(+id, box);
  }

  @Delete('delete/:id')
  async deleteBox(@Param('id', ParseIntPipe) id: string) {
    return this.misteryBoxesService.deleteBox(+id);
  }
}
