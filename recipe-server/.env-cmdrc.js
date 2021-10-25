module.exports = {
    local: {
        NODE_ENV: 'local',
        SPOONACULAR_KEY: '1c9916890d8540a6ac7d4fe4c9b4f724',
        SPOONACULAR_PATH: 'https://api.spoonacular.com/recipes',
        ORIGIN: 'http://localhost:4300',
        LOCAL: 'http://localhost:3000'
    },
    prod: {
        NODE_ENV: 'prod',
        SPOONACULAR_KEY: '1c9916890d8540a6ac7d4fe4c9b4f724',
        SPOONACULAR_PATH: 'https://api.spoonacular.com/recipes',
        ORIGIN: 'http://localhost:4300',
        LOCAL: 'http://localhost:3000'
    }
};