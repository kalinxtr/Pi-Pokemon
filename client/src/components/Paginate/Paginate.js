import React from "react";

export default function Paginate({pokemonsPerPage, pokemonsState, pagination, currentPage}){
    const pageNumbers = []
    if(Math.ceil(pokemonsState / pokemonsPerPage) < currentPage ){ // si la condicion retorna falsy, entonces setea la pagina en 1, ya que no hay nada
        pagination(1)
    }

    for(let i = 1; i <= Math.ceil(pokemonsState / pokemonsPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul>
                {
                    pageNumbers && pageNumbers.map((number, e) => (
                        <button key={e} onClick={() => pagination(number, e)} style={{backgroundColor:"rgb(250, 51, 51)", borderRadius:"5px", margin:"5px", color:"white", borderColor:"rgb(250, 51, 51)"}}>
                            <p className="list">{number}</p>
                        </button>
                    ))
                }
            </ul>
        </nav>
    )
}