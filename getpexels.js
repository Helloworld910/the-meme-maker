import { createClient } from 'pexels';
import * as dotenv from 'dotenv';

dotenv.config();

const client = createClient(process.env.pexKey);

client.photos.curated({ per_page: 1 }).then(photos => {
  var info = photos
  var photo = info["photos"]
  console.log(photo[0])
  var sourCe = photo[0]
  var links = sourCe["src"]
  console.log(links["original"])
});
