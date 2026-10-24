import {Body, Controller, Post, Get, Param, Put, Delete} from '@nestjs/common';
import {VariantsService} from "./variants.service";
import {CreateVariantsDto} from "./dto/create-variants.dto";
import {DelVariantsDto} from "./dto/delete-variants.dto";



@Controller('variants')
export class VariantsController {
    constructor(private variantsService: VariantsService) {}

    @Post()
    createVariants(@Body() createVariantsDto: CreateVariantsDto) {
        return this.variantsService.create(createVariantsDto)
    }

    @Get()
    getAllVariants() {
        return this.variantsService.getAllVariants()
    }

    @Put('/:id')
    deleteVariantsByRange(@Body() delVariantsDto: DelVariantsDto) {
        return this.variantsService.deleteVariantsByRange(delVariantsDto.from, delVariantsDto.to)
    }

    @Delete('/:id')
    deleteVariantsById(@Param('id') id: string) {
        return this.variantsService.deleteVariantsById(Number(id))
    }

    @Delete()
    deleteAllVariants() {
        return this.variantsService.deleteAllVariants()
    }
}