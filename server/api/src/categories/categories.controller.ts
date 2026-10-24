import {Body, Controller, Post, Get, Delete, Param} from '@nestjs/common';
import {CategoriesService} from "./categories.service";
import {CreateCategoriesDto} from "./dto/create-categories.dto";


@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoriesDto) {
        return this.categoriesService.create(createCategoryDto)
    }

    // @Put()
    // update(@Body() updateCategoryDto: UpdateCategoryDto) {
    //     // console.log(updateCategoryDto)
    //     return this.categoriesService.update(updateCategoryDto.id, updateCategoryDto)
    // }

    @Get()
    getCategories() {
        return this.categoriesService.getAllCategories()
    }

    @Get('/:name')
    getCategoryByName(@Param('name') name: string) {
        return this.categoriesService.getCategoryByName(name)
    }

    @Delete('/:name')
    deleteCatByName(@Param('name') name: string) {
        return this.categoriesService.deleteCatByName(name)
    }

    @Delete()
    deleteAllCategories() {
        return this.categoriesService.deleteAllCategories()
    }
}