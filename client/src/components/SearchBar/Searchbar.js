import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchPokemon } from "../../redux/actions";
import "./SearchBar.css"

export default function SearchBar(){
    let [search, setSearch] = useState("")
    const dispatch = useDispatch()

    function handleSearch(e){
        e.preventDefault(e)
        setSearch(e.target.value)
        console.log(search)
    }

    function handleOnSubmit(e){
        e.preventDefault(e)
        dispatch(SearchPokemon(search))
        setSearch("")
    }


    return(
        <div>
            <div className="SearchDiv">
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <input type="text" onChange={(e) => handleSearch(e)} value={search} />
                    <button type="submit" >Search</button>
                </form>
            </div>
        </div>
    )
}