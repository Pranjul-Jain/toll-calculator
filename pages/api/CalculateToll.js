import axios from "axios"

// This is a backend function which will fetch the cost details and other details from Tollguru api using polyline string and vehicle type
export default async function handler(req,res){
    const {polyline,vehicleType} = req.query

    // if polyline or vehicleType values not defined then send 500 internal server error
    if(!polyline || !vehicleType){
        res.status(500).json({"Message":"Something went wrong!"})
    }

    // fetches toll api data from toll guru api
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
        // extracting and sending fuel cost and distance from response
        res.status(200).json({"fuel":data.route.costs.fuel,"distance":data.route.distance.text})
    }else{
        res.status(500).json({"Message":"Something went wrong!"})
    }
}