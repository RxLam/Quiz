import {Body, Controller, Post, Get, Put, Param, HttpStatus, HttpException} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {AddScoresDto} from "./dto/add-scores.dto";
import {DeleteScoresDto} from "./dto/delete-scores.dto";
import {LoginUserDto} from "./dto/login-user.dto";


@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/:username')
    getUserData(@Param('username') username: string) {
        return this.usersService.getUserByUsername(username)
    }

    @Post('/addScores')
    addScores(@Body() addScoresDto: AddScoresDto) {
        return this.usersService.addScores(addScoresDto)
    }

    @Put('/deleteScores')
    deleteScores(@Body() deleteScoresDto: DeleteScoresDto) {
        return this.usersService.deleteAllScores(deleteScoresDto)
    }

    @Post('registration')
    createUser(@Body() userDto: CreateUserDto) {
        try {
            return this.usersService.registration(userDto)
        } catch(e) {
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.NOT_FOUND)
        }
    }

    @Post('login')
    login(@Body() userDto: LoginUserDto) {
        try {
            return this.usersService.login(userDto)
        } catch(e) {
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.NOT_FOUND)
        }
    }
}