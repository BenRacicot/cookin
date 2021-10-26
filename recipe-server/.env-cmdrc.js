module.exports = {
    local: {
        NODE_ENV: 'local',
        SPOONACULAR_KEY: '063cd9f7589d4978ad516c013d8f9c9a',
        SPOONACULAR_PATH: 'https://api.spoonacular.com/recipes',
        ORIGIN: 'http://localhost:4300',
        LOCAL: 'http://localhost:3000'
    },
    prod: {
        NODE_ENV: 'prod',
        SPOONACULAR_KEY: '063cd9f7589d4978ad516c013d8f9c9a',
        SPOONACULAR_PATH: 'https://api.spoonacular.com/recipes',
        ORIGIN: 'http://localhost:4300',
        LOCAL: 'http://localhost:3000'
    }
};