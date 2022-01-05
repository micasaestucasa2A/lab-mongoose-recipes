const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create([{ title: "Dubitchou", cuisine: "bulgarian" }]);
    Recipe.insertMany(data)
      .then((newRecipe) => {
        console.log("Great Success");
        console.log(newRecipe);
        modifyRecipe();
        deleteCarrotCake();
        closeDataBase();
      })
      .catch((notNewRecipe) => {
        console.log("Big Failure !");
        console.log(notNewRecipe);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

 //Iterations 4-5 functions 

async function modifyRecipe() {
  try {
    const found = await Recipe.findOneAndUpdate(
      { duration: 220 },
      { duration: 100 },
      { new: true }
    );
    console.log(
      "Chef Luigi is a world class drunk, 100 min are enough if you don't pass out with Chianti",
      found
    );
  } catch (err) {
    console.error(err);
  }
}

function deleteCarrotCake() {
  Recipe.findOneAndRemove({ name: "Carrot Cake" })
    .then((notAvalaible) => {
      console.log("No more available", notAvalaible);
    })
    .catch((err) => console.error(err));
}

async function closeDataBase() {
  try {
    mongoose.disconnect();
    console.log("Database succesfully closed")
  }
  catch(err){
    console.error(err)
  }
}