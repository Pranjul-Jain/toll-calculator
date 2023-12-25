import axios from 'axios'


//Handles the request and returns the country based on the provided latitude and longitude. 
export default async function handler(req,res){
        const {lat,lng} = req.query;
        if(!lat || !lng){
            res.status(500).json({"Message":"Something went wrong!"})
        }

        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${lng}&result_type=country&key=${process.env.GOOGLE_API_KEY}`)

        if(response){
            const data = response.data;
            let country = data.plus_code

            if(country.compound_code){
                country = country.compound_code
                // extracting street address from country(eg. "sfsaf+Af America, Usa")
                res.status(200).json({"country":country.slice(country.indexOf(" ")+1)})
            }else{
                // if street adsress is not found then send country name
                res.status(200).json({"country":data.results[0].formatted_address})
            }
        }else{
            res.status(500).json({"Message":"Something went wrong!"})
        }

}

