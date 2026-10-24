import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtUser {
    id: number;
    username: string;
    email?: string;
}

export interface AuthenticatedRequest {
    headers: {
        authorization?: string;
    };
    user?: JwtUser;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context
            .switchToHttp()
            .getRequest<AuthenticatedRequest>();
        const authorization = request.headers.authorization;
        const [scheme, token, ...extraParts] = authorization?.trim().split(/\s+/) ?? [];

        if (
            scheme?.toLowerCase() !== 'bearer' ||
            !token ||
            extraParts.length > 0
        ) {
            throw new UnauthorizedException({
                message: 'Пользователь не авторизован',
            });
        }

        try {
            const payload = this.jwtService.verify<JwtUser>(token);

            if (
                !payload ||
                typeof payload.id !== 'number' ||
                typeof payload.username !== 'string'
            ) {
                throw new Error('JWT payload is missing required user claims');
            }

            // Expose only the claims the application needs, not other token data.
            request.user = {
                id: payload.id,
                username: payload.username,
                ...(typeof payload.email === 'string' ? { email: payload.email } : {}),
            };

            return true;
        } catch {
            throw new UnauthorizedException({
                message: 'Пользователь не авторизован',
            });
        }
    }
}
