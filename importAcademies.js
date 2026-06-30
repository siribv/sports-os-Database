require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');

const Academy = require('./models/Academy');

mongoose.connect(process.env.MONGO_URI);

const results = [];

fs.createReadStream('academies.csv')
  .pipe(csv())
  .on('data', (data) => {

      results.push({

          academyId:data['Academy ID'],
          name:data['Academy Name'],
          slug:data['Slug'],

          latitude:Number(data['Latitude']),
          longitude:Number(data['Longitude']),

          description:data['Description'],

          sport:data['Sport'],

          address:data['Address'],
          city:data['City'],
          state:data['State'],

          contactNumber:data['Contact Number'],

          googleMapsLink:data['Google Maps Link'],

          academyImage:data['Academy Image'],

          fees:data['Fees'],

          facilities:data['Facilities'],

          batchTimings:data['Batch Timings'],

          ageGroups:data['Age Groups'],

          gender:data['Gender'],

          batchCapacity:Number(data['Batch Capacity']),

          rating:Number(data['Rating']),

          reviewCount:Number(data['Reviews']),

          verified:data['Verified'] === 'true',

          socialLinks:data['Social Links']

      });

  })
  .on('end', async () => {

      await Academy.insertMany(results);

      console.log('Academies Imported Successfully');

      mongoose.connection.close();

  });