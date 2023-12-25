import axios from "axios"

export default async function handler(req,res){
    const {input} = req.query;

    if(!input){
        res.status(500).json({"Message":"Something went wrong!"})
    }

    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_API_KEY}`)

    if(response){
        const countryList = new Array();
        const data = response.data;
        let index = 0;

        while(index < 5 && index < data.predictions.length){
            const coardResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${data.predictions[index].place_id}&key=${process.env.GOOGLE_API_KEY}`)
            const coardData = coardResponse.data;
            countryList.push({
                 "country":data.predictions[index].description,
                 "lat": coardData.results[0].geometry.location.lat,
                 "lng": coardData.results[0].geometry.location.lng
            })
            index++;
        }

        res.status(200).json({"countryList":countryList})
    }
}