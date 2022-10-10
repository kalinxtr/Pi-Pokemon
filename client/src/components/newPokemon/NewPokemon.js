import React, { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import { getTypes, PostPokemon } from "../../redux/actions";
import { useState } from "react";
import "./NewPokemon.css"
import NavBar from "../Nav/navBar";



export default function NewPokemon(){

    const [input, setInput] = useState({
        name:"",
        attack: 0,
        life: 0,
        speed: 0,
        defense: 0,
        height: 0,
        weight: 0,
        img: 0,
        types:[]
    })
    const [errors, setErrors] = useState({
        name: "Must have a name",
        attack: "Please provide attack",
        life: "Please provide life",
        speed: "Please provide speed",
        defense: "Please provide defense",
        height: "Please provide height",
        weight: "Please provide weight",
        img: "Please provide IMG",
        types: "Please select at least 1 Pokemon Type"
    });
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types) 

    const validate = function(input){
        let errors = {};
        if (!input.name){
            errors.name = "Name is required"
        }
        else if(!/^[a-zA-Z\s]*$/.test(input.name)) {
            errors.name = "Solo debe contener letras y espacios";
        }
        if(!input.attack){
            errors.attack = "Please provide attack"
        }
        if(!input.speed){
            errors.speed = "Please provide speed"
        }
        if(!input.defense){
            errors.defense = "Please provide defense"
        }
        if(!input.life){
            errors.life = "Please provide life"
        }
        if(!input.weight){
            errors.weight = "Please provide weight"
        }
        if(!input.height){
            errors.height = "Please provide height"
        }
        if(!input.img){
            errors.img = "Please provide IMG"
        }

        if(Number(input.attack) < 0 || Number(input.attack) > 100 ){
            errors.attack = "must be a number between 0 & 100"
        }
        if(Number(input.speed) < 0 || Number(input.speed) > 100 ){
            errors.speed = "must be a number between 0 & 100"
        }
        if(Number(input.life) < 0 || Number(input.life) > 100 ){
            errors.life = "must be a number between 0 & 100"
        }
        if(Number(input.defense) < 0 || Number(input.defense) > 100 ){
            errors.defense = "must be a number between 0 & 100"
        }
        if(Number(input.height )< 0 || Number(input.height)> 100 ){
            errors.height = "must be a number between 0 & 100"
        }
        if(Number(input.weight )< 0 || Number(input.weight)> 1000 ){
            errors.weight = "must be a number between 0 & 1000"
        }
        if(input.types.length === 0){
            errors.types = "Please select at least 1 Pokemon Type"
        }
        return errors
    
    }

    function handleChange(e) {
        e.preventDefault(e)
        console.log(input)
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value

        }))

    }
    


    function handleSelect(e){
        e.preventDefault(e)
        setInput({
            ...input,
            types: [...new Set([...input.types, e.target.value])]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
        document.getElementById("selectTypes").selectedIndex = 0
    }

    function handleDeleteTypes(e){
        e.preventDefault(e)
        setInput({
            ...input,
            types: input.types.filter(el => el !== e.target.value)
        })
    }



    function handleSubmit(e){
        e.preventDefault(e)
        console.log(input)
        if(errors.hasOwnProperty("name") || errors.hasOwnProperty("attack") || errors.hasOwnProperty("life")
        || errors.hasOwnProperty("speed") || errors.hasOwnProperty("defense") || errors.hasOwnProperty("height") || errors.hasOwnProperty("weight")
         || errors.hasOwnProperty("img") ){
            return alert("Data has errors")
         } else {
            dispatch(PostPokemon(input))
            alert("Succesfull Pokemon Create")
            setInput({
                name:"",
                attack:"",
                life:"",
                speed:"",
                defense:"",
                height:"",
                weight:"",
                img:"",
                types:[]
            })
        } 
    }




    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    return(
        <div className="divMainForm">
            <NavBar/>
                <h1>Create your Pokemon!</h1>
            <div className="divForm1">
                <form onSubmit={(e) => handleSubmit(e)} >
                    <div>
                        <h3>Name</h3>
                        <input type="text" name="name" value={input.name} onChange={(e) => handleChange(e)} placeholder="Only letters & spaces"/>
                        {errors.name && (
                            <p className="err">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <h3>Life</h3>
                        <input type="number" name="life" onChange={(e) => handleChange(e)} placeholder="Only values between 0-100"/>
                        {errors.life && (
                            <p className="err">{errors.life}</p>
                        )}
                    </div>
                    <div>
                        <h3>Attack</h3>
                        <input type="number" name="attack" onChange={(e) => handleChange(e)} placeholder="Only values between 0-100"/>
                        {errors.attack && (
                            <p className="err">{errors.attack}</p>
                        )}
                    </div>
                    <div>
                        <h3>Defense</h3>
                        <input type="number" name="defense" onChange={(e) => handleChange(e)} placeholder="Only values between 0-100"/>
                        {errors.defense && (
                            <p className="err">{errors.defense}</p>
                        )}
                    </div>
                    <div>
                        <h3>Speed</h3>
                        <input type="number" name="speed" onChange={(e) => handleChange(e)} placeholder="Only values between 0-100"/>
                        {errors.speed && (
                            <p className="err">{errors.speed}</p>
                        )}
                    </div>
                    
                    <div>
                        <h3>Height</h3>
                        <input type="number" name="height" onChange={(e) => handleChange(e)} placeholder="Only numbers between 0 and 100"/>
                        {errors.height && (
                            <p className="err">{errors.height}</p>
                        )}
                    </div>
                    <div>
                        <h3>Weight</h3>
                        <input type="number" name="weight" onChange={(e) => handleChange(e)} placeholder="Only numbers between 0 and 1000"/>
                        {errors.weight && (
                            <p className="err">{errors.weight}</p>
                        )}
                    </div>
                    <div className="imageDivForm">
                        <h3>Image</h3>
                        <input type="text" name="img" onChange={(e) => handleChange(e)} placeholder="Set image URL" />
                        {
                            errors.img && (
                                <p className="err">{errors.img}</p>
                            )
                        }
                    </div>
                    <div className="typesDivForm">
                        <h3>Pokemon Type/Types</h3>
                        <select id="selectTypes" name="types" onChange={(e) => handleSelect(e)}>
                            <option selected disabled>Select</option>
                            {
                                types?.map((el, i) => {
                                    return (
                                        <option key={i} value={el.name} >{el.name}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            errors.types && (
                                <p className="err" >{errors.types}</p>
                            )
                        }

                        <div className="typesDisplay">
                            { input.types.length ? input.types.map((e) => (
                                <div key={e}>
                                <button style={{height: "25px",marginTop:"20px"}} value={e} name="types" onClick={(ev) => handleDeleteTypes(ev)}>X</button>
                                <p key={e}>{e}</p>
                                </div> 
                            ))
                         : <p>Select Type</p>   
                            
                        }
                      
                        </div>

                    </div>
                    <button style={{marginLeft:"270px", marginTop:"60px",
                     width:"100px", height:"40px"}} type="submit">Submit!</button>
                </form>
            </div>
        </div>
    )
}