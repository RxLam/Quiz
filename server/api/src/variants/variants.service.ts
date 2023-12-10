import { Injectable } from '@nestjs/common';
import {CreateVariantsDto} from "./dto/create-variants.dto";
import {InjectModel} from "@nestjs/sequelize"
import {Variants} from "./variants.model";
import {sortById} from "../utils/sortById";
import {arrayGenerator} from "../utils/arrayGenerator";


@Injectable()
export class VariantsService {
    constructor(@InjectModel(Variants) private variantsRepository) {}

    async create(dto: CreateVariantsDto) {
        const variants = await this.variantsRepository.create({...dto})
        return variants
    }

    async getAllVariants() {
        const variants = await this.variantsRepository.findAll({include: {all: true}})
        return sortById(variants)
    }

    async deleteVariantsById(id) {
        try {
            const variants = await this.variantsRepository.destroy({
                where: {id},
                restartIdentity: true,
                cascade: true
            })
            return variants
        } catch(e) {
            return e
        }
    }

    async deleteVariantsByRange(from, to) {
        try {
            const arrIds = arrayGenerator(from, to)
            await this.variantsRepository.update(
            {
                delta: arrIds.length
            }
            ,{
                where: {id: from-1}
            })
            const variants = await this.variantsRepository.destroy({
                where: {id: arrIds},
                restartIdentity: true
            })
            return variants
        } catch(e) {
            return e
        }
    }

    async deleteAllVariants() {
        try {
            const variants = await this.variantsRepository.destroy({
                where: {},
                restartIdentity: true,
                cascade: true
            })
            return variants
        } catch(e) {
            return e
        }
    }
}