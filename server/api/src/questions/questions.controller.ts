import {Body, Controller, Post, Get, Param, Put, Delete, UseGuards} from '@nestjs/common';
import {QuestionsService} from "./questions.service";
import {CreateQuestionsDto} from "./dto/create-questions.dto";
import {UpdateQuestionsDto} from "./dto/update-questions.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";



@Controller('questions')
export class QuestionsController {
    constructor(private questionsService: QuestionsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    createQuestions(@Body() createQuestionsDto: CreateQuestionsDto) {
        return this.questionsService.create(createQuestionsDto)
    }

    // @Put()
    // update(@Body() updateQuestionsDto: UpdateQuestionsDto) {
    //     // console.log(updateCategoryDto)
    //     return this.questionsService.update(updateQuestionsDto.id, UpdateQuestionsDto)
    // }

    @Put()
    @UseGuards(JwtAuthGuard)
    add(@Body() updateQuestionsDto: UpdateQuestionsDto) {
        return this.questionsService.addQuestions(updateQuestionsDto.id, updateQuestionsDto)
    }

    @Get()
    getQuestions() {
        return this.questionsService.getAllQuestions()
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    deleteAllQuestions() {
        return this.questionsService.deleteAllQuestions()
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    deleteQuestionById(@Param('id') id: string) {
        return this.questionsService.deleteQuestionsById(Number(id))
    }

    @Delete('/:name')
    @UseGuards(JwtAuthGuard)
    deleteQuestionByName(@Param('name') name: string) {
        return this.questionsService.deleteQuestionByName(name)
    }
}
