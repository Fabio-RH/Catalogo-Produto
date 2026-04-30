import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { EstoqueModule } from './estoque/estoque.module';
import { ImagemModule } from './imagem/imagem.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [CategoriaModule, EstoqueModule, ImagemModule, ProdutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
