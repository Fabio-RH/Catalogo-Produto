import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Controller('categorias')
export class CategoriaController {
constructor(private readonly categoriaService: CategoriaService) {}
@Post()
create(@Body() dto: CreateCategoriaDto) {
return this.categoriaService.create(dto);
}
@Get()
findAll() {
return this.categoriaService.findAll();
}
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
return this.categoriaService.findOne(id);
}
@Patch(':id')
update(
@Param('id', ParseIntPipe) id: number,
@Body() dto: any,
) {
return this.categoriaService.update(id, dto);
}
@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) {
return this.categoriaService.remove(id);
}
}