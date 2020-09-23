import React from 'react'
import { HeroesList } from '../ui/heroes/HeroesList'

export const MarvelScreen = () => {

    const publisher = "Marvel Comics";


    return (
        <div>
            <h1>MARVEL SCREEN</h1>
            <hr />

            <HeroesList 
                publisher={ publisher }
            />
        </div>
    )
}
