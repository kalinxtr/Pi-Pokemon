import react, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getDetail } from "../../redux/actions"
import Loader from "../../myImages/detailLoading.gif"
import "./Detail.css"
import NavBar from "../Nav/navBar"

export default function Detail(props){
    let pokemonDetail = useSelector(state => state.detail)
    const dispatch = useDispatch()
    let id = props.match.params.id
    console.log(pokemonDetail)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])
    
    return(
        <div className="div0">
            {
            pokemonDetail.length?    
                <div className="NavBarDetailDiv">
                <NavBar/>
                </div>

                : (<div></div>)
            }
            {
            pokemonDetail.length? (
                                    <div className="detailDiv">
                                        <div className="name-div">
                                            <h1>{pokemonDetail[0].name}</h1>
                                        </div>
                                        <div className="img-div">
                                            <img src={pokemonDetail[0].img}/>
                                        </div>
                                            <div className="bordecito">
                                                <div className="stats-div">
                                                    <h3 className="elh3">Pokemon Stats</h3>
                                                    <span>Life:{pokemonDetail[0].life}</span>
                                                    <span>Attack:{pokemonDetail[0].attack}</span>
                                                    <span>Defense:{pokemonDetail[0].defense}</span>
                                                    <span>Speed:{pokemonDetail[0].speed}</span>
                                                    <span>Height:{pokemonDetail[0].height}</span>
                                                    <span>Weight:{pokemonDetail[0].weight}</span>
                                                </div>
                                                <div className="types-div">
                                                    <h3 className="elh3">Pokemon Type/Types</h3>
                                                    {
                                                        pokemonDetail.map(el => {
                                                            return(
                                                                <span style={{marginBottom:"10px", textAlign:"center", backgroundColor:"blanchedalmond", borderRadius:"5px"}} >{el.type ? el.type.join(",") : el.Types.join(",")}</span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                    </div>
                                        
                                    ) : (
                                        <div className="DetailLoaderDiv">
                                            <div className="DetailLoaderDiv1">
                                                <img src={Loader} />
                                            </div>    
                                        </div>
                                    )

            }        
        </div>
    )
}