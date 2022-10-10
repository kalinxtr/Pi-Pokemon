const axios = require("axios")
const {Pokemon, Type} = require("../db")
require("dotenv").config()


const getApiPokemons = async () => {
    const apiUrl = await axios("https://pokeapi.co/api/v2/pokemon?limit=40");
    let apiInfo = apiUrl.data.results
    let pokemon = await Promise.all(apiInfo.map(async e =>{
        const pokemons = (await axios (e.url))
        return pokemons
    }))
    const finalPokemon = pokemon.map(r => ({
        name: r.data.name,
        id: r.data.id,
        life: r.data.stats[0].base_stat,
        attack: r.data.stats[1].base_stat,
        defense: r.data.stats[2].base_stat,
        speed: r.data.stats[5].base_stat,
        height: r.data.height,
        weight: r.data.weight,
        type: r.data.types.map(el => el.type.name),
        img: r.data.sprites.other.home.front_default
    }))    
    return finalPokemon

}

const getDbPokemons = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: ""
            }
        }
    })
}

const getAllPokemons = async () => {
    const dbPokemons = await getDbPokemons();
    const apiURL = await getApiPokemons();
    const allData = dbPokemons.concat(apiURL)
    return allData;
}

const getAll = async (req, res) => {
    try{
        let allPokemons = await getAllPokemons();
        if(req.query.name) {
            let name = req.query.name
            let pokemonByName = allPokemons.filter((el) => {
                return el.name.toLowerCase() === name.toLowerCase()
            })
            pokemonByName.length 
            ? res.status(200).send(pokemonByName)
            : res.status(404).send("Sorry can't Find requested Pokemon")
        } else res.status(200).send(allPokemons)
        
    } catch(error){
        console.log(error)
    }
}

const getPokemonById = async (req, res) => {
    try{
        let pokemonAll = await getAllPokemons()
        
        if(req.params.id){
            let id = req.params.id
            let pokemonById = await pokemonAll.filter((el) => {return el.id == id})
            pokemonById.length? res.status(200).send(pokemonById) : res.status(404).send("Sorry, can't find requested Pokemon")


        } else return ("request error")

    } catch(err){
        console.log(err)
    }
}

const newPokemon = async (req, res) => {
    let {name, life, attack, defense,
    speed, height, weight, img, types } = req.body 

    try{
        const exist = await Pokemon.findOne({where: {name: name}})
        if(exist) return res.status(400).send("Error, this pokemon already exists")

        const dbReq = await Type.findAll({})
        
        let typesArray = []
        types?.map(t => typesArray.push({name: t}))
        

        let createdPokemon = await Pokemon.create({
            name,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            img
        })

        for(let i = 0; i < typesArray.length; i++){
            let typeDb = await Type.findAll({where: {name: typesArray[i].name}})
            createdPokemon.addType(typeDb)
        }

        return res.status(200).send(createdPokemon)
    
        

    } catch(error){
        console.log(error) 
        res.status(500).send("Error, check if pokemon name is already in DB")
    }
}



module.exports = {
    getAll, getPokemonById, newPokemon
}