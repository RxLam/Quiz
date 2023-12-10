import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import {ServeStaticModule} from "@nestjs/serve-static";
import {CategoriesModule} from "./categories/categories.module";
import {Categories} from "./categories/categories.model";
import {QuestionsModule} from "./questions/questions.module";
import {Questions} from "./questions/questions.model";
import {VariantsModule} from "./variants/variants.module";
import {Variants} from "./variants/variants.model";
import * as path from 'path';
import {UsersModule} from "./users/users.module";
import {User} from "./users/users.model";
import {AuthModule} from "./auth/auth.module";




@Module({
  controllers: [],
  providers: [],
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mistery',
    database: 'postgres',
    models: [Categories, Questions, Variants, User],
    autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve( __dirname, 'static'),
    }),
    CategoriesModule,
    QuestionsModule,
    VariantsModule,
    UsersModule,
    AuthModule
  ],
})

export class AppModule {}