import axios from 'axios'

export default async function handler(req,res){
        const {lat,lng} = req.query;
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${lng}&result_type=country&key=${process.env.GOOGLE_API_KEY}`)

        if(lat && lng && response){
            const data = response.data;
            let country = data.plus_code

            if(country.compound_code){
                country = country.compound_code
                res.status(200).json({"country":country.slice(country.indexOf(" ")+1)})
            }else{
                res.status(200).json({"country":data.results[0].formatted_address})
            }
        }else{
            res.status(500).json({"Message":"Something went wrong!"})
        }

}

