import { Injectable } from '@nestjs/common';
import {CreateCategoriesDto} from "./dto/create-categories.dto";
import {InjectModel} from "@nestjs/sequelize"
import {Categories} from "./categories.model";
import {sortById} from "../utils/sortById";


@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Categories) private categoriesRepository) {}

    async create(dto: CreateCategoriesDto) {
        const category = await this.getCategoryByName(dto.name)
        if (category) {
            return 'Эта категория уже существует'
        }
        else {
            const category = await this.categoriesRepository.create({...dto})
            return category
        }
    }

    // async update(id, dto: UpdateCategoryDto) {
    //     let toUpdate = await this.categoriesRepository.findByPk(id);
    //
    //     let updated = Object.assign(toUpdate, dto);
    //     console.log(dto)
    //     return await this.categoriesRepository.update(dto, {
    //         where: toUpdate._previousDataValues
    //     });
    // }

    async getCategoryByName(name) {
        const category = await this.categoriesRepository.findOne({where: {name}})
        return category
    }

    async getAllCategories() {
        const category = await this.categoriesRepository.findAll({include: {all: true}})
        return sortById(category)
    }


    async deleteCatByName(name) {
        try {
            const category = await this.categoriesRepository.findOne({
                where: {
                    name
                }
            });
            await category.destroy({restartIdentity: true, cascade: true})

            return category
        } catch(e) {
            return e
        }
    }

    async deleteAllCategories() {
        try {
            const categories = await this.categoriesRepository.destroy({
                where: {},
                restartIdentity: true,
                truncate: true,
                cascade: true
            })
            return categories
        } catch(e) {
            return e
        }
    }
}