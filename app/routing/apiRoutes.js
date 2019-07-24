// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var friendData = require("../data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  // app.post("/api/friends", function(req, res) {
  //   // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
  //   // It will do this by sending out the value "true" have a table
  //   // req.body is available since we're using the body parsing middleware
  //     friendData.push(req.body);
  //     res.json(true);
  // });
  // ---------------------------------------------------------------------------
  app.post("/api/friends", function(req,res){
      
    var userInputMessageBodyObject=req.body;

   console.log('LOOK', userInputMessageBodyObject)

    //store the total difference
    var totalDifference=0;

    //store the result for each substraction from the scores
    var result=0;

    //make a new array to store another array of obects with
    //total difference in the scores
    var newTablewithTotalDifference =[]
    

    //outer for loop to iterate the entire array of object from table
    for(var i=0; i< friendData.length;i++){

        //reset the total difference for the next object person
        totalDifference=0;

        //inner for loop to calculate the new Person from the user Input off req.body
        for(var j=0; j< userInputMessageBodyObject.scores.length;j++){

            //subtract each object score from first element to the last element of the array
             result=  parseFloat(friendData[i].scores[j]) - parseFloat(userInputMessageBodyObject.scores[j])
        
             //sum up the subtraction and stores in totatdifference
            //and change the values to be positive
             totalDifference += Math.abs(result)
         }
        
        //inserts into a new array of object for sorting the least total difference
         newTablewithTotalDifference.push({
             friendData: friendData[i].name,
             totalDifference: totalDifference,
             photo: friendData[i].photo
         })
    }  

  //add a new person to our table from 
    //userInput that is stored in req.body
    friendData.push(userInputMessageBodyObject);
 
    //sorts the new array of object against the total difference
    newTablewithTotalDifference.sort(function(a, b){
        return a.totalDifference-b.totalDifference
    })

    console.log(newTablewithTotalDifference)
    
    //returns first element and response back the total least difference to the           //client during the post request 
    res.json(newTablewithTotalDifference[0]);
})
};
