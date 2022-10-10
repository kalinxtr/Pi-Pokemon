const axios = require("axios");
const {Type} = require("../db")

const getTypes = async (req, res) => {
    try{

        const dbTypes = await Type.findAll();
        if(dbTypes.length) return res.status(200).send(dbTypes)

        
        let apiURL =  await axios("https://pokeapi.co/api/v2/type")
        let apiData = apiURL.data.results

        apiData.forEach(async t => {
            await Type.findOrCreate({
                where: {
                    name: t.name
                }
            })
        })

        const types = apiData.map(el => {
            return {
                id: el.id,
                name: el.name

            }
        })

        res.status(200).send(types)

    } catch(err){
        console.log(err)
    }
}



module.exports= {
    getTypes
}