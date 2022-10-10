const initialState = {
    pokemons: [],
    allPokemons: [],
    filtered: [],
    types: [],
    detail: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_ALL":
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                filtered: action.payload,
            };

        case "GET_TYPES":
            return{
                ...state,
                types: action.payload
            };
        
        case "FILTER_BY":
            if(action.payload === "All"){
                return {
                    ...state,
                    pokemons: state.allPokemons
                }
            } else {
                return {
                    ...state, pokemons: state.allPokemons.filter((el) => {
                        if(el.Types){
                            // console.log(el.Types)
                            return el.Types.map(el => {return el.name}).includes(action.payload)
                        }
                        if(el.type){
                        return el.type.find((element) => {
                            return element === action.payload
                        })
                    }
                    
                    })
                }
            };
        case "ORDER_BY":
            let statePokemons = [...state.pokemons]
            if(action.payload === "All"){
                return{
                    ...state,
                    pokemons: [...state.pokemons]
                }
            }
            
            if(action.payload === "Z-A"){
                statePokemons.sort((prev,next) => {
                    if(prev.name > next.name) {
                        return -1;
                    }
                    if(prev.name < next.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                pokemons: statePokemons
            }
            }
            if(action.payload === "A-Z"){
                statePokemons.sort((prev,next) => {
                    if(prev.name > next.name) {
                        return 1;
                    }
                    if(prev.name < next.name) {
                        return -1
                    }
                    return 0
                })
                return {
                    ...state,
                    pokemons: statePokemons
                }
            }
            if(action.payload === "Asc"){
                statePokemons.sort((a,b) => {
                    if(a.attack < b.attack){
                        return -1
                    }
                    if(a.attack > b.attack){
                        return 1
                    }
                    return 0
                })
                return {
                    ...state,
                    pokemons: statePokemons
                }
            }
            if(action.payload === "Desc"){
                statePokemons.sort((a,b) => {
                    if(a.attack > b.attack){
                        return -1
                    }
                    if(a.attack < b.attack){
                        return -1
                    }
                    return 0
                })
                return {
                    ...state,
                    pokemons: statePokemons
                }
            };
        case "CREATED_IN":
            let pokeState = [...state.allPokemons]

            if(action.payload === "All"){
                return{
                    ...state,
                    pokemons: state.filtered
                }
            }

            if(action.payload === "DB"){
                const filtered = pokeState.filter( el => el.createdInDb)
                console.log(pokeState.filter( el => el.createdInDb))
                return {
                    ...state,
                    pokemons: action.payload === "All" ? state.pokemons : [...filtered] 
                }
            }
            if(action.payload === "API"){
                const filtered = pokeState.filter(el => !el.createdInDb)
                return {
                    ...state,
                    pokemons: action.payload === "All" ? state.pokemons : [...filtered] 
                }
            }
        case "SEARCH_POKEMON":
            return{
                ...state,
                pokemons: action.payload
            };
        case "POST_POKEMON":
            return {
                ...state
            }

        case "GET_DETAIL":
            return{
                ...state,
                detail: action.payload
            }

        case "CLEAR_DETAIL":
            return{
                ...state,
                detail: []
            }


        
       
       
    default: return state
        }
    }   