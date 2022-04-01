import { createClient } from 'pexels';
import * as dotenv from 'dotenv';
import fs from "fs"


dotenv.config();

const client = createClient(process.env.pexKey);

client.photos.curated({ per_page: 1 }).then(photos => {
  var info = photos
  var photo = info["photos"]
  var sourCe = photo[0]
  console.log(sourCe)
  var h = sourCe["height"]
  var w = sourCe["width"]
  var avColor = sourCe["avg_color"]
  var links = sourCe["src"]
  // json data
  var imageData = {
    "URL": links["original"],
    "height": h,
    "width": w,
    "avg_color": avColor
  };

  console.log(imageData);

  var jsonContent = JSON.stringify(imageData);
  console.log(jsonContent);
  fs.writeFile("./public/image.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
});



// stringify JSON Object
//var jsonContent = JSON.stringify(jsonObj);
//console.log(jsonContent);

//fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    //if (err) {
		//console.log("An error occured while writing JSON Object to File.");
        //return console.log(err);
    //}

    //console.log("JSON file has been saved.");
//});
