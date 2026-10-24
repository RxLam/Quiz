import { Injectable, NotFoundException } from '@nestjs/common';
import {CreateCategoriesDto} from "./dto/create-categories.dto";
import {InjectModel} from "@nestjs/sequelize"
import {Categories} from "./categories.model";
import {sortById} from "../utils/sortById";
import { col, fn, where } from 'sequelize';


@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Categories) private categoriesRepository) {}

    async create(dto: CreateCategoriesDto) {
        const name = dto.name?.trim();
        const category = await this.getCategoryByName(name)
        if (category) {
            return 'Эта категория уже существует'
        }
        else {
            const category = await this.categoriesRepository.create({...dto, name})
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
        const normalizedName = typeof name === 'string' ? name.trim() : '';
        const category = await this.categoriesRepository.findOne({
            where: where(fn('TRIM', col('name')), normalizedName),
        })
        return category
    }

    async getAllCategories() {
        const category = await this.categoriesRepository.findAll({include: {all: true}})
        return sortById(category)
    }


    async deleteCatByName(name) {
        const normalizedName = typeof name === 'string' ? name.trim() : '';
        const category = await this.categoriesRepository.findOne({
            where: where(fn('TRIM', col('name')), normalizedName),
        });
        if (!category) {
            throw new NotFoundException(`Категория «${normalizedName}» не найдена`);
        }

        await category.destroy({restartIdentity: true, cascade: true});
        return { id: category.id, name: category.name.trim() };
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
