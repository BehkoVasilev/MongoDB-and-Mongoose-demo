const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String
});

catSchema.methods.sayMeow = function () {
    console.log(`${this.name} is ${this.age} years old - Meow...`);
};

const Cat = mongoose.model('Cat', catSchema);

async function main() {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://127.0.0.1:27017/catShelter");

    console.log("Database connected!");
    // await Cat.deleteMany({name: "Nav"});
    // await createCat("Misho", 4, "streetcat")

    const cats = await readCats();
    cats.forEach(cat => cat.sayMeow());

};

async function readCats() {
    const cats = await Cat.find();

    console.log(cats);

    return cats
};

async function createCat(name, age, breed) {
    await Cat.create({
        name,
        age,
        breed,
    });

    // const cat = new Cat({
    //     name,
    //     age,
    //     breed
    // });
    // await cat.save();
}

main()