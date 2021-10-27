# CookIn Recipe Search Engine
CookIn is a monolithic recipe search engine application. The server runs on NestJS and the app is built with Angular 13. All components are custom built, no UI frameworks.

Add your own Spoonacular API key to recipe-server/.env-cmdrc.js [docs](https://spoonacular.com/food-api/docs#Search-Recipes-Complex) [get one here](https://spoonacular.com/registerEmail)

## The Application
1. `cd client` 
2. `npm run start:local` for local app development 
3. `npm run start:prod` to run with production environment variables
4. Navigate to `http://localhost:4300/` to get cookin'

## The Server
1. `cd recipe-server` 
2. `npm run start:local` for local server development 
3. `npm run start:prod` to run with production environment variables

## Devops
Solid environmental configuration is needed for ease of deployment as well as keeping environment-based code out of the project. Environment variables are enough to develop or deploy with environment-specific resources.

For Angular, the build targets are configured within client/angular.json.
For Nest, environment variables are configured with the env-cmd package and live within `recipe-server/.env-cmdrc.js`

## Search
The search field can accept text or a comma-separated list of ingredients. The endpoint's logic is done in recipes/recipes.service.ts where the query is checked for a list or text string.

The Spoonacular API is then queried with `query` or `includeIngredients`.
