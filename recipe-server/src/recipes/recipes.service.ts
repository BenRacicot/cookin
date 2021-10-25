import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class RecipesService {
    private _commaTest = new RegExp('[\,]', 'g');

    constructor(private httpService: HttpService) { }

    // single recipe by its ID
    getRecipe(id: string) {
        let params = {
            apiKey: process.env.SPOONACULAR_KEY
        };

        return this.httpService.get(`${process.env.SPOONACULAR_PATH}/${id}/information`, {params: params})
            .pipe(
                map(response => response.data)
            );
    }

    getRecipes(query:any): any {
        // A basic check if string contains a list
        const ingredients = query.params.match(this._commaTest) ? query.params : null;
        // Else, regular text search
        const text = !ingredients ? query.params : null;

        const params = {
            apiKey: process.env.SPOONACULAR_KEY,
            query: text,
            includeIngredients: ingredients, // list of required ingredients https://spoonacular.com/food-api/docs#Search-Recipes-Complex
            fillIngredients: true // return ingredient info
        };

        // debug
        // console.log(
        //     'params: ' + JSON.stringify(query, null, 4), 
        //     'request path: ' + JSON.stringify(`${process.env.SPOONACULAR_PATH}/complexSearch`, null, 4), 
        //     `request params: ${JSON.stringify(params, null, 4)}`
        // );

        return this.httpService.get(`${process.env.SPOONACULAR_PATH}/complexSearch`, {params: params})
            .pipe(
                map(response => response.data)
            );
    }
}
