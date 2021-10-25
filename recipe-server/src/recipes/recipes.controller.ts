import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';

import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {

    constructor(private recipeService: RecipesService) { }

    @Get()
    async getRecipes(@Req() request:Request) {
        return this.recipeService.getRecipes(request.query);
    }

    @Get(':id')
    async getRecipe(@Param('id') id): Promise<any> {
        return this.recipeService.getRecipe(id);
    }

}
