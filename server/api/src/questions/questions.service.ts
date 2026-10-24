import { Injectable } from '@nestjs/common';
import {CreateQuestionsDto} from "./dto/create-questions.dto";
import {InjectModel} from "@nestjs/sequelize"
import {Questions} from "./questions.model";
import {UpdateQuestionsDto} from "./dto/update-questions.dto";
import {sortById} from "../utils/sortById";


@Injectable()
export class QuestionsService {
    constructor(@InjectModel(Questions) private questionsRepository) {}

    async create(dto: CreateQuestionsDto) {
        try {
            let question = await this.questionsRepository.create({...dto})

            return question
        }  catch(e) {
            return e
        }
    }

    async addQuestions(id, dto: UpdateQuestionsDto) {
        try {
            let toAdd = await this.questionsRepository.findByPk(id)

            if (toAdd.dataValues.questions.includes(dto.questions)) return 'Этот вопрос уже есть'

            await this.questionsRepository.update(
                {
                    questions: [...toAdd.dataValues.questions, dto.questions]
                },
                {
                    where: {id}
                }
            )
            return `Вопрос - ${dto.questions} добавлен`
        } catch(e) {
            return e
        }
    }

    async getAllQuestions() {
        try {
            const questions = await this.questionsRepository.findAll({include: {all: true}})
            return sortById(questions)
        } catch(e) {
            return e
        }
    }

    async deleteAllQuestions() {
        try {
            const questions = await this.questionsRepository.destroy({
                where: {},
                restartIdentity: true,
                cascade: true
            })
            return questions
        } catch(e) {
            return e
        }
    }

    async deleteQuestionsById(id) {
        try {
            const questions = await this.questionsRepository.destroy({
                where: {id: 1},
                restartIdentity: true,
                cascade: true
            })

            return questions
        } catch(e) {
            return e
        }
    }

    async deleteQuestionByName(name) {
        try {
            const category = await this.questionsRepository.destroy({
                where: {name}
            })
            return category
        } catch(e) {
            return e
        }
    }
}