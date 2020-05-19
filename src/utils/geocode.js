const request=require('request');

const geocode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+'.json?access_token=pk.eyJ1IjoiYWplZXRoa3VtYXIiLCJhIjoiY2s4dnMyYmxhMGZ2dDNncGtmcmNxY3QxdiJ9.1Q5UU9h3EDbj0g0NIA6w9A&limit=1';
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to location service',undefined);
        }
        else if(body.features.length===0)
        {
            callback('Unable to find the location.Try another Search.',undefined);
        }
        else{
            console.log("geoCode callback function entered:"+url);
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })


}

module.exports=geocode;