import axios from "axios"

export default async function handler(req,res){

    const {origin,destination} = req.query

    if(!origin || !destination){
        res.status(500).json({"Message":"Something went wrong!"})
    }

    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}`)

    if(response){
        const data = response.data
        const polyline = data.routes[0].overview_polyline.points
        res.status(200).json({"polyline":polyline,"duration":data.routes[0].legs[0].duration.text})
    }else{
        res.status(500).json({"Message":"Something went wrong!"})
    }
}
