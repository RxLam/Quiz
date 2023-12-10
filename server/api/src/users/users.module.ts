import {Module} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import { JwtModule } from '@nestjs/jwt';
import {AuthModule} from "../auth/auth.module";


@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'azaza',
            signOptions: {
                expiresIn: '24h'
            }
        }),
        AuthModule
    ],
    exports: [
        JwtModule
    ]
})
export class UsersModule {}