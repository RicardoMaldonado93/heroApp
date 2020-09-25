import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../ui/heroes/HeroCard';
import queryString from 'query-string'
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search); 

    const [ values, handleInputChange ] = useForm({ searchText: q });
    
    const { searchText } = values;
    
    const heroesFiltered = useMemo( () => getHeroesByName(q), [ q ]);


    const handleSearch = (e)=>{
        e.preventDefault();
        history.push(`?q=${searchText}`)
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4> Search Form </h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input
                            type="text"
                            name="searchText"
                            placeholder="Find your hero..."
                            value={ searchText }
                            className="form-control"
                            onChange={ handleInputChange }
                            autoComplete="off"
                        />

                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-block"
                            style={{ marginTop: 10 }}
                        >
                            Search...
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    { 
                        ( q === '' ) && 
                        <div className="alert alert-info">Search a hero</div>

                    }
                    { 
                        ( heroesFiltered.length < 1 && q !== '' ) && 
                    <div className="alert alert-danger">{ `There's not a hero with ${q}`}</div>

                    }
                    {
                        heroesFiltered.map( hero =>(
                            <div className="animate__animated animate__fadeIn" key={hero.id}>
                                <HeroCard 
                                    
                                    key={hero.id}
                                    { ...hero }
                                />
                            
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
