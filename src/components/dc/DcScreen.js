import React from 'react'
import { HeroesList } from '../ui/heroes/HeroesList'

export const DcScreen = () => {

    const publisher = "DC Comics";

    return (
        <div>
            <h1>DC SCREEN</h1>
            <hr />

            <HeroesList 
                publisher={ publisher }
            />
        </div>
    )
}
