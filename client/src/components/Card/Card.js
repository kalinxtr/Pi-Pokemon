import react from "react"
import {Link} from "react-router-dom"
import "./Card.css"



export default function Card(props){

    console.log(props.Types)
    
    return(
        <div className="primaryCardDiv">
            <Link style={{textDecoration: 'none', textAlign:"center",float:"left", width:"100%"}} to={`/home/${props.id}`} >
            <h3 className="style">{props.name}</h3>
            <div className="imgDiv">
                <img src={props.img} />
            </div>
                <div className="eldiv">    
                    <div className="TypesDiv">
                        <span className="style2">
                        Pokemon Types: {props.type? props.type.join(","): props.Types.map(el => el.name)  }
                        </span>
                    </div>
                    <div className="TypesDiv">
                        <span className="style2">
                        Pokemon Attack: {props.attack}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}