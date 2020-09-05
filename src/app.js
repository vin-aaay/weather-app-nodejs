const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const path=require('path')
const express=require('express')
const hbs=require('hbs')

const app=express()
const port = process.env.PORT || 3000

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../Templates/views')
const PartialPaths=path.join(__dirname,'../Templates/partials')

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(PartialPaths)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        Name : 'Vinay'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        Name:'vinay meena'
    })
})

app.get('/help',(req,res)=>{
    res.render('HELP',{
        title:'HELP',
        Name:'vinay',
        msg:'good to see you'
    })
})
//app.use(express.static())


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'please provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error)
        {
            return res.send({
                error:'Location not found.Try a new one'
            })
            
        }
        
        forecast(latitude,longitude,(error,forecastdata)=>
        {
            if(error)
            {
                return res.send({
                    error:'Location not found'
                })
            }
    
            res.send([{
                location:place,
                forecast:forecastdata,
                address:req.query.address
            }])
        })
    })
    
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{

    res.render('404',{
        title:'404 error',
        Name:'vinay',
        errormsg:'Help article not found'
    })
})

app.get('*',(req,res)=>{

        res.render('404',{
            title:'404 error',
            Name:'vinay',
            errormsg:'page not found'
        })
})

app.listen(port,()=>{
    console.log('welcome to port '+ port)
})