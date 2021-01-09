import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroesById } from '../../../selectors/getHeroesById';

export const HeroScreen = ({history}) => {

    const { heroeID } = useParams();
    const hero  = useMemo(() => getHeroesById( heroeID ), [ heroeID ]);

    if( !hero ){ return (<Redirect to="/"/> ) }

    const handleReturn = ()=>{ 
        if( history.length <= 2 ) 
            history.push('/');
        else
            history.goBack(); 
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4 animate__animated animate__rotateInDownLeft">
                <img  src={ `../assets/heroes/${heroeID}.jpg` }  alt={ superhero } className="img-thumbnail" style={{maxHeight: 500}} />
            </div>
            
            <div className="col-8 animate__animated animate__fadeInRight">
                <h3>{ superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b> Alter ego: </b> { alter_ego } </li>
                    <li className="list-group-item"> <b> Publisher: </b> { publisher } </li>
                    <li className="list-group-item"> <b> First Appearance: </b> { first_appearance } </li>
                </ul>

                <h5 className="mt-5"> Characters </h5>
                <div> { characters }</div>

                <button 
                    className="btn btn-outline-info mt-5" 
                    onClick={ handleReturn }
                >     
                Return 
                </button>

                
            </div>

        </div>
    )
}
