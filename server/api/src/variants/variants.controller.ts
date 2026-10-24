import {Body, Controller, Post, Get, Param, Put, Delete, UseGuards} from '@nestjs/common';
import {VariantsService} from "./variants.service";
import {CreateVariantsDto} from "./dto/create-variants.dto";
import {DelVariantsDto} from "./dto/delete-variants.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";



@Controller('variants')
export class VariantsController {
    constructor(private variantsService: VariantsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    createVariants(@Body() createVariantsDto: CreateVariantsDto) {
        return this.variantsService.create(createVariantsDto)
    }

    @Get()
    getAllVariants() {
        return this.variantsService.getAllVariants()
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    deleteVariantsByRange(@Body() delVariantsDto: DelVariantsDto) {
        return this.variantsService.deleteVariantsByRange(delVariantsDto.from, delVariantsDto.to)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    deleteVariantsById(@Param('id') id: string) {
        return this.variantsService.deleteVariantsById(Number(id))
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    deleteAllVariants() {
        return this.variantsService.deleteAllVariants()
    }
}
