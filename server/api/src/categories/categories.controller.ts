import {Body, Controller, Post, Get, Delete, Param, UseGuards} from '@nestjs/common';
import {CategoriesService} from "./categories.service";
import {CreateCategoriesDto} from "./dto/create-categories.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";


@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    createCategory(@Body() createCategoryDto: CreateCategoriesDto) {
        return this.categoriesService.create(createCategoryDto)
    }

    @Get()
    getCategories() {
        return this.categoriesService.getAllCategories()
    }

    @Get('/:name')
    getCategoryByName(@Param('name') name: string) {
        return this.categoriesService.getCategoryByName(name)
    }

    @Delete('/:name')
    @UseGuards(JwtAuthGuard)
    deleteCatByName(@Param('name') name: string) {
        return this.categoriesService.deleteCatByName(name)
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    deleteAllCategories() {
        return this.categoriesService.deleteAllCategories()
    }
}
