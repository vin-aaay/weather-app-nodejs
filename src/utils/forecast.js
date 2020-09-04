const request=require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='https://api.darksky.net/forecast/a77b37008af2f36c82f64763d020d981/'+latitude+','+longitude+'?units=si'

    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('unable to connect',undefined)
        }
        else if(body.error){
            callback('location cannot be found try some other',undefined)
        }
        else{
            callback(undefined,
            body.daily.data[0].summary + '.It is currently ' + body.currently.temperature + ' and rain probability is '  + body.currently.precipProbability)
        }
    })
}
    module.exports = forecast