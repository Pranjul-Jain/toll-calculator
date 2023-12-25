import React,{useRef,useState,useEffect} from 'react'
import axios from "axios"

const LocationInput = ({setGeoCoardinates,...props}) => {

  const [countryList,setCountryList] = useState([])

  const inputRef = useRef();
  const cancelTokenSource = useRef();

  useEffect(() => {
    // Cleanup function to cancel the request when the component unmounts
    return () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel('Component unmounted');
      }
    };
  }, []);

  return (
    <>
        <div className="relative w-full">
            <input onChange={inputTextHandler} {...props} ref={inputRef} />
            <ul className="grid gap-y-1 cursor-pointer hover:color-black absolute top-full left-0 w-full z-10 h-max bg-slate-50 hidden p-2" id={props.id+"CountryList"}>
                {countryList.length>0 && countryList.map((object)=>{
                    return <li key={new Date().getTime()+"-"+object.lat+props.id} className='uppercase text-left w-full hover:bg-slate-100' lat={object.lat} onClick={selectInput} lng={object.lng}>{object.country}</li>
                })}
            </ul>
        </div>
    </>
  )
 
  // function to select country from list
  async function selectInput(e){
    setGeoCoardinates([parseFloat(e.target.getAttribute("lat")),parseFloat(e.target.getAttribute("lng"))])
    inputRef.current.value = e.target.textContent
  }

  // fetching result from places google to fetch complete street address or provide auto complete options based on input string
  async function inputTextHandler(event){

    const {value} = event.target
  
    const geoLocationCountryList = document.getElementById(event.target.id+"CountryList")

    if (cancelTokenSource.current) {
        // Cancel the previous request
        cancelTokenSource.current.cancel('New request initiated');
    }

    cancelTokenSource.current = axios.CancelToken.source();

    let isCountryList = true;

    if(value.length>0){
        try {
            const response = await axios.get('/api/GetPlace?input=' + value, {
              cancelToken: cancelTokenSource.current.token, // Pass the cancel token to the request
            });
    
            const data = response.data;
    
            if (data.countryList.length > 0) {
              isCountryList = true;
              setCountryList(data.countryList);
            } else {
              isCountryList = false;
              countryList.length > 0 && setCountryList([]);
            }
        }catch (error) {
            if (axios.isCancel(error)) {
              // Request was canceled, ignore
            } else {
              // Handle other errors
              console.error('Error fetching data:', error.message);
            }
        }
    }else {
          isCountryList = false;
          countryList.length > 0 && setCountryList([]);
    }
     

    // switching the visibility of the country list based on the isCountryList variable if country list length zero or not fetched than isCountryList will be false
    if(isCountryList){
        if(geoLocationCountryList.classList.contains("hidden")){
            geoLocationCountryList.classList.remove("hidden")
        }
    }else{
        if(geoLocationCountryList.classList.contains("hidden")){
        geoLocationCountryList.classList.add("hidden")
        }
    }
    
  }

}

export default LocationInput