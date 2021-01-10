const { heroes } = require("../data/heroes");


export const getHeroesByPublisher = ( publisher = "" ) =>{

    const validPublisher = [ "DC Comics", "Marvel Comics" ];


    if( !validPublisher.includes( publisher ) ){
        return `Publisher not valid`;
    }

    return heroes.filter( hero => hero.publisher === publisher );
}