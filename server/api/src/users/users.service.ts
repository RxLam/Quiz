import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectModel} from "@nestjs/sequelize"
import {User} from "./users.model";
import { JwtService } from '@nestjs/jwt'
import * as bcryptjs from 'bcryptjs'
import {AddScoresDto} from "./dto/add-scores.dto";
import {DeleteScoresDto} from "./dto/delete-scores.dto";
import {LoginUserDto} from "./dto/login-user.dto";



@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository, private jwtService: JwtService) {}

    async registration(userDto: CreateUserDto) {
        try {
            const candidateByName = await this.usersRepository.findOne({where: {username: userDto.username}})
            const candidateByEmail = await this.usersRepository.findOne({where: {email: userDto.email}})

            if(candidateByName || candidateByEmail) return new UnauthorizedException('Пользователь с таким логином уже существует')

            else {
                const hashPassword = await bcryptjs.hash(userDto.password, 3)
                const user = await this.usersRepository.create({username:userDto.username,password:hashPassword,email:userDto.email,birthDate:userDto.birthDate})
                return this.generateToken(user)
            }
        }  catch(e) {
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.NOT_FOUND)
        }
    }

    async addScores(addScoresDto: AddScoresDto) {
        try {
            let toAdd = await this.usersRepository.findOne({where: {username: addScoresDto.username}})
            await this.usersRepository.update(
                {
                    scores: toAdd.scores+addScoresDto.scores
                },
                {
                    where: {username: addScoresDto.username}
                })
        } catch(e) {
            return e
        }
    }

    async deleteAllScores(deleteScoresDto: DeleteScoresDto) {
        try {
            let toDelete = await this.usersRepository.findOne({where: {username: deleteScoresDto.username}})
            await this.usersRepository.update(
                {
                    scores: 0
                },
                {
                    where: {username: toDelete.username}
                })
        } catch(e) {
            return e
        }
    }

    async login(userDto: LoginUserDto) {
        let user = await this.validateUser(userDto)
        try {
            return this.generateToken(user)
        }
        catch(e) {
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.NOT_FOUND)
        }
    }

    async getUserByUsername(username) {
        try {
            const user = await this.usersRepository.findOne({where: {username}})
            return {
                username: user.username,
                email: user.email,
                birthDate: user.birthDate.replace(/T\.?.+/, ''),
                scores: user.scores,
                password: user.password
            }
        }
        catch(e) {
            return e
        }
    }

    private async generateToken(user: User) {
        const payload = {id: user.id, username: user.username, email: user.email, password: user.password}

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto) {
        const user = await this.usersRepository.findOne({where: {username: userDto.username}})
        if(!user) throw new HttpException( 'Некорректный логин или пароль', HttpStatus.UNAUTHORIZED)

        const passwordEquals = await bcryptjs.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        } else {
            throw new HttpException('Некорректный логин или пароль', HttpStatus.UNAUTHORIZED)
        }
    }
}