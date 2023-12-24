import axios from "axios"

export default async function handler(req,res){
    const {polyline,vehicleType} = req.query

    if(!polyline || !vehicleType){
        res.status(500).json({"Message":"Something went wrong!"})
    }

    const response = await axios.post(`https://apis.tollguru.com/toll/v2/complete-polyline-from-mapping-service`,{
        mapProvider : "google",
        polyline,
        vehicle : {
            type : vehicleType
        },
        units: {
            currency: "USD"
        }
    },{
        headers:{
            "Content-Type": "application/json",
            "x-api-key" : process.env.TOLL_GURU_API_KEY
        }
    })

    if(response){
        const data = response.data
        res.status(200).json({"fuel":data.route.costs.fuel,"distance":data.route.distance.text})
    }else{
        res.status(500).json({"Message":"Something went wrong!"})
    }
}