import react from "react"
import {Link} from "react-router-dom"
import "./Landing.css"


export default function Landing(){
    
    return(
        <div className="mainLandingDiv">
            <h1>Welcome to PokeWorld!</h1>
            <div className="LandingDiv0">
                <Link to = "/home">
                <button>Let's Go!</button>
                </Link>
            </div>
        </div>
    )

}