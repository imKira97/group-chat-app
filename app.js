const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const fs=require('fs');



app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res,next)=>{

    //read file
    fs.readFile('messagechat.txt',(err,data)=>{

        if(err){
            data='no chat exist'
        }
        res.send(`${data}<form action="/" method="post" 
        onSubmit="document.getElementById('username').value=localStorage.getItem('username')"> 
        <input type="hidden"  id="username" name="username"><input type="text" name="msg" placeholder="Enter message"> <br>
        <button type="submit">send</button></form>`)

    })

})


app.post('/',(req,res,next)=>{
    const data=`${req.body.username} : ${req.body.msg}`;
    console.log(data)
    fs.writeFile("messagechat.txt",data,{flag:'a'},(err)=>{
        err? console.log(err):res.redirect('/');
    })
    
})

app.get('/login',(req,res,next)=>{
    res.send(`<form action="/login" method="post" 
    onSubmit="localStorage.setItem('username', document.getElementById('user').value)" >  
    <input type="text" id="user" name="username" placeholder="Enter username"> <br>
    <button type="submit">Login</button>  </form>`)
})

app.post('/login',(req,res,next)=>{
    res.redirect('/');//redirecting to post
})



app.listen(7000);
