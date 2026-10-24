import { forwardRef, Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt';


@Module({
    controllers: [],
    providers: [],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'azaza',
            signOptions: {
                expiresIn: '24h'
            }
        })
    ],
    exports: [
        JwtModule
    ]
})
export class AuthModule {}