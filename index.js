const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Iteration2
    let myRecipe = {
      title: "Chili Con Carne",
      level: "Easy Peasy",
      Ingredients: ["Carne Picada", "Feijão", "Malagueta"],
      cuisine: "Mexicana",
      dishType: "main_course",
      duration: 45,
      creator: "Linguini",
    };
    let myRecipeDb = await Recipe.create(myRecipe);
    console.log(myRecipeDb);

    // Iteration3
    let newRecipeArray = await Recipe.insertMany(data);

    // Iteration4
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );

    // Iteration5
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Success Deletation");

    // Iteration6
    await mongoose.connection.close();

    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
