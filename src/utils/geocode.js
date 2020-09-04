const request=require('request')

const geocode=(address,callback)=>{

    const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidmluLWFhYXkiLCJhIjoiY2tkbW1pcDc2MTl3djJwczI4aGZ3bnhkdiJ9.rwXmjvRvEzEXBLRafjcc2g&limit=1'

    request({url : geourl , json:true},(error,{body})=>{
        if (error) {
            callback('cannot connect to internet',undefined)
            
        }
        else if(body.features.length === 0)
        {
            callback('cannot find the location,try another one',undefined)
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                place : body.features[0].place_name
            })
        }
    })
}

module.exports=geocode