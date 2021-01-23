const express = require('express');
const bodyparser = require("body-parser");
const path = require('path');
require('./db/conn')
const Datadb=require('./db/model')



const app = express();


const PORT =  8080



// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))
app.use(bodyparser.json());

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))
app.use(express.static(__dirname + '/assets'));


app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/presentation',async (req,res)=>{
    Datadb.find((err,docs)=>{
        if (err) throw err;
        res.render('crud',{data:docs})
    }).catch(err=>{
        console.log(err)
    })

    
})
app.get('/presentation/add',(req,res)=>{
    res.render('add_user')
})
app.post('/presentation/add',async (req,res)=>{
    try{
		const addingrecords = await new Datadb(req.body)
        const data =  await addingrecords.save()
        console.log(data)
		res.status(201).redirect('/presentation');
		
	}catch(e){
		res.status(400).send(e);
	}
})
app.get("/edit/:id",async (req,res)=>{
	try{
		
		const getMen = await Datadb.findOneAndUpdate({_id: req.params.id},req.body,{
			new:true},(err,docs)=>{
                if(err){
                    console.log('error while searching')
                }
                else{
                    res.render('edit',{data:docs})
                }
            })
		
	}catch(e){
		res.status(400).send(e);
	}
})
app.post("/edit/:id",async (req,res)=>{
	try{
		
		const getMen = await Datadb.findByIdAndUpdate({_id: req.params.id},req.body,{
			new:true},(err,docs)=>{
                if(err){
                    console.log('error while searching')
                }
                else{
                    res.redirect('/presentation')
                }
            })
		
	}catch(e){
		res.status(400).send(e);
	}
})
app.get('/delete/:id',(req,res)=>{
    Datadb.findByIdAndDelete({_id: req.params.id},req.body,(err,docs)=>{
                if(err){
                    console.log('error while searching')
                }
                else{
                    res.redirect('/presentation')
                }
            })
})



app.listen(PORT, ()=> { 
    console.log(`Server is running on http://localhost:${PORT}`)
})
