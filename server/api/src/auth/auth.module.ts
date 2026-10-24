import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

const jwtSecret = process.env.PRIVATE_KEY;

if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error('PRIVATE_KEY must be set to a secret of at least 32 characters');
}

@Module({
    providers: [JwtAuthGuard],
    imports: [
        JwtModule.register({
            secret: jwtSecret,
            signOptions: {
                expiresIn: '24h'
            }
        })
    ],
    exports: [
        JwtModule,
        JwtAuthGuard,
    ]
})
export class AuthModule {}
