const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://dnyaneshwari1997:dnyaneshwari10@cluster0.tzgqddw.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connection established!");

    // await listDatabases(client);
    // console.log("Database Printed!");

    /*

      CRUD Operations -

      Create
      Read
      Update
      Delete

    */

    // Read Operation

    // findOne
    // await findOneListingByName(client, "Board Infinity Mumbai Office");

    // find
    // await findMultipleListingsByName(client, "Board Infinity Mumbai Office");

    // Create Operation

    // await createListing(client, {
    //   name: "Board Infinity Mumbai Office",
    //   summary: "A charming office in Mumbai!",
    //   bedrooms: 1,
    //   bathroom: 2,
    // });

    // await createMultipleListings(client, [
    //   {
    //     name: "Board Infinity Noida Office",
    //     summary: "A charming office in Noida!",
    //     bedrooms: 1,
    //     bathroom: 2,
    //   },
    //   {
    //     name: "Board Infinity Noida Office",
    //     summary: "A charming office in Noida!",
    //     bedrooms: 4,
    //     bathroom: 6,
    //   },
    // ]);

    // Update Operation

    // await updateListingByName(client, "Infinite Views", {
    //   bedrooms: 16,
    //   beds: 80,
    // });

    // await upsertListingByName(client, "Golden Views", {
    //   bedrooms: 8,
    //   beds: 10,
    // });

    // await upsertListingByName(client, "Purple Views", {
    //   bedrooms: 2,
    //   beds: 4,
    // });

    // Delete Operation

    // await deleteOneListingByName(client, "Board Infinity Mumbai Office");
    await deleteMultipleListingsByName(client, "Board Infinity Mumbai Office");

  } catch (e) {
    console.log("Within Catch Block!");
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// Listing all the databases available within the cluster
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}

async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({ name: nameOfListing });

  /*
    findOne will return 1st row/document which passes the search criteria
  */

  if (result) {
    console.log(
      `Found a listing in the collection with the name '${nameOfListing}':`
    );
    console.log(result);
  } else {
    console.log(`No listings found with the name '${nameOfListing}'.`);
  }
}

async function findMultipleListingsByName(client, nameOfListing) {
  const cursor = client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find({ name: nameOfListing });

  /*
    find will return all rows/documents which passes the search criteria
  */

  console.log(cursor);
  const results = await cursor.toArray();

  if (results.length > 0) {
    console.log(results);
  } else {
    console.log(`No listings found with given search criteria.`);
  }
}

async function createListing(client, newListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);

  console.log(`Entry Added. \nResult ${JSON.stringify(result)}`);
  console.log(`New listing created with id: ${result.insertedId}`);
}

async function createMultipleListings(client, arrayOfListings) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(arrayOfListings);

  console.log("Listings are added! Result -> ", result);
}

async function updateListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne({ name: nameOfListing }, { $set: updatedListing });

  console.log(result);

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function updateMultipleListingsByName(
  client,
  nameOfListing,
  updatedListing
) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateMany({ name: nameOfListing }, { $set: updatedListing });

  console.log(result);

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function upsertListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne(
      { name: nameOfListing },
      { $set: updatedListing },
      { upsert: true }
    );

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);

  console.log("Result -> ", result);

  if (result.upsertedCount > 0) {
    console.log(
      `One document was inserted with the id ${result.upsertedId._id}`
    );
  } else {
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  }
}

async function deleteOneListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteOne({ name: nameOfListing });
  console.log("Result -> ", result);
}

async function deleteMultipleListingsByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteMany({ name: nameOfListing });

  console.log("Result -> ", result);
}
