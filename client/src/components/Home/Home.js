import React from "react";
import { getAllPokemons} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Card from "../Card/Card";
import "./Home.css"
import Paginate from "../Paginate/Paginate";
import Filters from "../Filters/Filters";
import Loader from "../../myImages/Loading.gif"
import SearchBar from "../SearchBar/Searchbar";
import NavBar from "../Nav/navBar";



export default function Home(){
    const dispatch = useDispatch()
    const pokemonsState = useSelector(state => state.pokemons)

    const [currentPage, setCurrentpage] = useState(1);
    const [pokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemonsState.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const pagination = (pageNumber) => {
        setCurrentpage(pageNumber)
    }

    function handleReload(e){
        e.preventDefault(e)
        dispatch(getAllPokemons())
    }



    useEffect(() => {
        dispatch(getAllPokemons())
    }, [dispatch])


            //La card recibe la data mediante props
    return( pokemonsState.length?
        <div className="primaryDiv">
            <NavBar/>
            <div className="searchDiv">
                <SearchBar/>
            </div>
            <div className="filterDiv">
                <Filters />
            </div>
            <div className="paginateDiv">
                <Paginate pokemonsPerPage={pokemonsPerPage} pokemonsState={pokemonsState.length} pagination={pagination} currentPage={currentPage} />
            </div>
            <div className="CardsDiv">
                {
                    currentPokemons && currentPokemons.map((element, i) => {
                        return(
                            <Card key={i} name={element.name} img={element.img} type={element.type} attack={element.attack} Types={element.Types? element.Types: null } id={element.id}  />
                        )
                    })
                }
            </div>
        </div>
        : (
            <div className="loadingDiv0">
                <div className="loadingDiv">
                    <img src={Loader} />
                    <br></br>
                    <span>Not Loading? Don't Worry! Just Reload</span>
                    <br></br>
                    <button onClick={(e) => handleReload(e)}>Reload Pokemons</button>
                    <br></br>
                </div>
            </div>
        )
    )

    
}