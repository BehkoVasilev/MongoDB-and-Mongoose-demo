const mongoose = require('mongoose');

async function main() {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://127.0.0.1:27017/catShelter");

    console.log("Database connected!");
    // await Cat.deleteMany({name: "Nav"});
    await createCat("Nav", 8, "persian")
    await readCats();

};

const catSchema = new mongoose.Schema({

    name: String,
    age: Number,
    breed: String
});

const Cat = mongoose.model('Cat', catSchema);

async function readCats() {
    const cats = await Cat.find();
    console.log(cats);
};

async function createCat(name, age, breed) {
    const cat = new Cat({
        name,
        age,
        breed
    });

    await cat.save();
}

main()