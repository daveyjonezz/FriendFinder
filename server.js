var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/app/public'));
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);
app.listen(PORT, function(){
    console.log("App listing on http://localhost:"+PORT)
})