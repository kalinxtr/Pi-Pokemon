import React from "react";
import { useDispatch } from "react-redux";
import { clearDetail, getAllPokemons } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./navBar.css"

export default function NavBar(){
    const dispatch = useDispatch()
    const history = useHistory()


    function handleOnClick(e){
        e.preventDefault(e)
        dispatch(getAllPokemons())
    }

    function handleStateDetail(e){
        e.preventDefault(e)
        dispatch(clearDetail())
        history.push("/home")
    }

    return(
        <div className="navDiv0">
            <Link to="/newPokemon">
            <button>Create!</button>
            </Link>
            <button onClick={(e) => handleStateDetail(e)}>Home</button>
            <button className="button" onClick={(e) => handleOnClick(e)}>Reload Pokemons</button>
        </div>
    )
}