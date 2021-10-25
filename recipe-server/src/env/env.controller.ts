import { Controller, Get } from '@nestjs/common';

@Controller('env')
export class EnvController {
    @Get()
    async getRecipes() {
 
        // get env values for demonstration
        // console.log(
        //     process.env.node_env,
        //     process.env.spoonacular_key,
        //     process.env.spoonacular_path,
        //     process.env.origin,
        //     process.env.local
        // );

        return {
            NODE_ENV:process.env.NODE_ENV,
            SPOONACULAR_KEY:process.env.SPOONACULAR_KEY,
            SPOONACULAR_PATH:process.env.SPOONACULAR_PATH,
            ORIGIN:process.env.ORIGIN,
            LOCA:process.env.LOCAL
        }
    }   
}
