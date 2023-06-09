// jshint esversion :6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
      res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

      const firstName = req.body.fName;
      const lastName = req.body.lName;
      const email = req.body.email;

      const data = {
            members: [
                  {
                  email_address: email,
                  status: "subscribed",
                  merge_fields: {
                        FName: firstName,
                        LName: lastName
                  }
                 
            }

      ]

};

const jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/18b46f0b75";

const options = {
      method: "POST",
      auth: "avni1:fc183c1baf07ec3e69aafc755b48ac85-us21"
}

 const request = https.request(url,options,function(response){
      if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
      } else {
            res.sendFile(__dirname + "/failure.html");
      }

      response.on("data", function(data){
            console.log(JSON.parse(data));
      });

});

 request.write(jsonData);
request.end();

});

//       console.log(firstName, lastName, email);
// });

 app.post("/failure", function(req, res){
        res.redirect("/")
 })

app.listen(3000, function() {
      console.log("Server is running on port 3000");
});


//API KEY
//fc183c1baf07ec3e69aafc755b48ac85-us21

// List Id
//18b46f0b75

