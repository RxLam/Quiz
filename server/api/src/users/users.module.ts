import {Module} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {AuthModule} from "../auth/auth.module";


@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        SequelizeModule.forFeature([User]),
        AuthModule
    ],
    exports: [
        AuthModule
    ]
})
export class UsersModule {}
