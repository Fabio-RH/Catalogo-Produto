import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { JwtStrategy } from './contexts/jwt.strategy';
import { ProductsRepository } from './repository/ProductsRepository';
import { CategoriesRepository } from './repository/CategoriesRepository';
import { StocksRepository } from './repository/StocksRepository';

@Module({
  imports: [
    PrismaModule,     
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService,
    JwtStrategy,
    ProductsRepository,
    CategoriesRepository,
    StocksRepository,
  ],
})
export class AppModule {}
