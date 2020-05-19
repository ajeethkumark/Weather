const express=require('express');
const path=require('path');
const hbs=require('hbs');

const forecast=require('./utils/forecast');

const geocode=require('./utils/geocode');




//console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const publicDirectoryPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');




const app=express();

//Set up a handle bar engine and view location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);


//Set up static directory to server
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ajeeth kumar'
    })
})

app.get('/help',(req,res)=>{
   // res.send('Help Page');
    res.render('help',{
        title:'Help',
        name:'Ajeeth'
    })
})

app.get('/about',(req,res)=>{
   // res.send('About Page');
   res.render('about',{
        title:'About',
        name:'Ajeeth'  
   })
});

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return  res.send({
                error:'You must provide the address'})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            console.log('Error in geocode:'+'{error:'+error+'}');
            return res.send("{\" error\":\""+error+"\"}");
        }
        console.log('callback  execution before step')
        forecast(latitude,longitude,(error,forecaseData)=>{
            if(error)
            {
                return res.send(error)
            }
            console.log('Enter to forecast')
            res.send({
                forecast:forecaseData,
                location,
                verify:'verify',
                address:req.query.address
            })
        })
    })

    /* console.log(req.query.address);
    res.send({
        forecast:'It is snowing',
        location:'philadelphia',
        address:req.query.address
    })  */
})

app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
        return  res.send({
                error:'You must provide the search term'})
    }

    console.log(req.query.search);
    res.send({
        product:[]
    })
})


app.get('*',(req,res)=>{
    res.send("404 page Not Found");
})


app.listen(3000,()=>{

    console.log('server up and running');
})



