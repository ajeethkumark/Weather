const request=require('request');

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=e6c41cace72f2878c7034e1a778bca47&query='+longitude+','+latitude;
   // 37.8267,-122.4233';
   console.log('forecast url:'+url);
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            console.log('Unable to connect to Weatherstack server');
        }
        else if(response.body.error)
        {
            console.log('Unable to find location');
        }
        else
        {
           console.log('Response:'+JSON.stringify(response.body));
           console.log('current temperature is '+response.body.current.temperature+ ' degree out.'+'There is a '+response.body.current.precip+'% chance of rain');
            callback(undefined,response.body.current.temperature+ ' degree out.'+'There is a '+response.body.current.precip+'% chance of rain');
        }
    })
}

module.exports=forecast