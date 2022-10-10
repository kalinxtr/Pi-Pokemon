import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FilterBy, getTypes, OrderBy, CreatedIn } from "../../redux/actions";
import "./filters.css"


export default function Filters(){
    const dispatch = useDispatch()
    const typesState = useSelector((state) => state.types)

    function handleFilterType(e){
        e.preventDefault(e)
        dispatch(FilterBy(e.target.value))
    }

    function handleOrderBy(e){
        e.preventDefault(e)
        dispatch(OrderBy(e.target.value))
    }

    function handleCreatedIn(e){
        e.preventDefault(e)
        dispatch(CreatedIn(e.target.value))
    }


    useEffect( () => {
        dispatch(getTypes()) // dispara la accion cuando tal cosa
    },[dispatch])

    return(
        <div>
            <div className="filters-div">
                <div>
                    <select id="typesSelector" className="selector" name="filterPokemons"  onChange={(e) => {handleFilterType(e)}}>
                        <option selected value="All">All Types</option>
                        {
                            typesState?.map((el, k) => (
                                <option key={k} value={el.name} >{el.name}</option>
                            ))
                        }
                    </select>
                </div>
                <br/>
                <div>
                    <select id="OrderBy" className="selector" name="filterAZ"  onChange={(e) => {handleOrderBy(e)}} >
                        <option value="All" selected> No order </option>
                        <optgroup label="Alphabetic">
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </optgroup>
                        <optgroup label="Order Attack">
                            <option value="Asc">Ascending</option>
                            <option value="Desc">Descending</option>
                        </optgroup>
                    </select>
                </div>
                <br/>
                <div>
                    <select id="CreatedSelector" className="selector" name="filterCreated"  onChange={(e) => handleCreatedIn(e)} >
                        <option value="All" selected>All Pokemons</option>
                        <option value="API">API</option>
                        <option value="DB">DB</option>
                    </select>
                </div>
            </div>
        </div>
    )
}