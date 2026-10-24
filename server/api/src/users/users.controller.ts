import {Body, Controller, Post, Get, Put, Req, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {AddScoresDto} from "./dto/add-scores.dto";
import {DeleteScoresDto} from "./dto/delete-scores.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {AuthenticatedRequest, JwtAuthGuard} from "../auth/jwt-auth.guard";


@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    getUserData(@Req() request: AuthenticatedRequest) {
        return this.usersService.getUserByUsername(request.user!.username)
    }

    @Post('/addScores')
    @UseGuards(JwtAuthGuard)
    addScores(@Req() request: AuthenticatedRequest, @Body() addScoresDto: AddScoresDto) {
        return this.usersService.addScores({ ...addScoresDto, username: request.user!.username })
    }

    @Put('/deleteScores')
    @UseGuards(JwtAuthGuard)
    deleteScores(@Req() request: AuthenticatedRequest, @Body() deleteScoresDto: DeleteScoresDto) {
        return this.usersService.deleteAllScores({ ...deleteScoresDto, username: request.user!.username })
    }

    @Post('registration')
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.registration(userDto)
    }

    @Post('login')
    login(@Body() userDto: LoginUserDto) {
        return this.usersService.login(userDto)
    }
}
