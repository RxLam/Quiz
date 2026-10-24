import {Body, Controller, Post, Get, Param, Put, Delete} from '@nestjs/common';
import {QuestionsService} from "./questions.service";
import {CreateQuestionsDto} from "./dto/create-questions.dto";
import {UpdateQuestionsDto} from "./dto/update-questions.dto";



@Controller('questions')
export class QuestionsController {
    constructor(private questionsService: QuestionsService) {}

    @Post()
    createQuestions(@Body() createQuestionsDto: CreateQuestionsDto) {
        return this.questionsService.create(createQuestionsDto)
    }

    // @Put()
    // update(@Body() updateQuestionsDto: UpdateQuestionsDto) {
    //     // console.log(updateCategoryDto)
    //     return this.questionsService.update(updateQuestionsDto.id, UpdateQuestionsDto)
    // }

    @Put()
    add(@Body() updateQuestionsDto: UpdateQuestionsDto) {
        return this.questionsService.addQuestions(updateQuestionsDto.id, updateQuestionsDto)
    }

    @Get()
    getQuestions() {
        return this.questionsService.getAllQuestions()
    }

    @Delete()
    deleteAllQuestions() {
        return this.questionsService.deleteAllQuestions()
    }

    @Delete('/:id')
    deleteQuestionById(@Param('id') id: string) {
        return this.questionsService.deleteQuestionsById(Number(id))
    }

    @Delete('/:name')
    deleteQuestionByName(@Param('name') name: string) {
        return this.questionsService.deleteQuestionByName(name)
    }
}