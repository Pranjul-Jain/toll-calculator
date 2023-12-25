import axios from "axios"

export default async function handler(req,res){
    const {address} = req.query;
    if(!address){
        res.status(500).json({"Message":"Something went wrong!"})
    }

    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`)
    if(response){
        const data = response.data;

        if(data.status=="OK"){
            res.status(200).json({"Message":"exist","address":data.results[0].formatted_address,"latlng":data.results[0].geometry.location})
        }else{
            res.status(200).json({"Message":"not exist"})
        }
    }
}