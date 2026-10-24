import {Module} from "@nestjs/common";
import {QuestionsService} from "./questions.service";
import {QuestionsController} from "./questions.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Questions} from "./questions.model";
import {Variants} from "../variants/variants.model";
import {VariantsModule} from "../variants/variants.module";
import {AuthModule} from "../auth/auth.module";


@Module({
    providers: [QuestionsService],
    controllers: [QuestionsController],
    imports: [
        SequelizeModule.forFeature([Questions, Variants]),
        VariantsModule,
        AuthModule,
    ],
    exports: [
        QuestionsService
    ]
})
export class QuestionsModule {}
