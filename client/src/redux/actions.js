import axios from "axios"



export function getAllPokemons(){
    return async function (dispatch){    
        let aux = await axios.get("/pokemons")
        return dispatch({
            type: "GET_ALL",
            payload: aux.data
        })
    }
} 

export function getTypes(){
    return async function(dispatch){
        let aux= await axios.get("/types")
        return dispatch({
            type: "GET_TYPES",
            payload: aux.data
        })
    }
}

export function FilterBy(payload){
    return {
        type: "FILTER_BY",
        payload
    }
}

export function OrderBy(payload){
    return {
        type:"ORDER_BY",
        payload
    }
}

export function CreatedIn(payload){
    return {
        type: "CREATED_IN",
        payload
    }
}

export function SearchPokemon(payload){
    return function (dispatch){
        axios.get(`/pokemons?name=${payload}`)
        .then((response) => {
            dispatch({
                type: "SEARCH_POKEMON",
                payload: response.data
            })
        }).catch((err)=>{
            alert("Cant find requested Pokemon, Sorry")
            console.log(err)
        })
    }
}

export function PostPokemon(payload){
    return async function (dispatch){
        try{
            const response = await axios.post("/newpokemon", payload)
            return response
        } catch(err){
            console.log(err)
        }
    }
}

export function getDetail(id){
    return async function (dispatch) {
        let get = await axios.get(`/pokemons/${id}`)
        console.log(get,"+-*/-+-*/*-/-+")
        dispatch({
            type:"GET_DETAIL",
            payload: get.data
        })
    }
}



export function clearDetail(){
    return {
        type: "CLEAR_DETAIL"
    }
}



