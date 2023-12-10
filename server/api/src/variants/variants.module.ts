import {Module} from "@nestjs/common";
import {VariantsService} from "./variants.service";
import {VariantsController} from "./variants.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Variants} from "./variants.model";
import {Questions} from "../questions/questions.model";


@Module({
    providers: [VariantsService],
    controllers: [VariantsController],
    imports: [
        SequelizeModule.forFeature([Variants, Questions])
    ],
    exports: [
        VariantsService
    ]
})
export class VariantsModule {}