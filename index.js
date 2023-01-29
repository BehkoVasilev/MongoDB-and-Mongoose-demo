const mongoose = require('mongoose');

const Cat = require('./models/Cat');

async function main() {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://127.0.0.1:27017/catShelter");

    console.log("Database connected!");
    // await Cat.deleteMany({name: "Misho"});
    await createCat("Nav", 11, "abyssinian", "VAC344-1210")

    const cats = await readCats();
    cats.forEach(cat => {
        cat.sayMeow(),
            cat.info
    });

};

async function readCats() {
    const cats = await Cat.find();

    console.log(cats);

    return cats
};

async function createCat(name, age, breed, vaccineNumber) {
    await Cat.create({
        name,
        age,
        breed,
        vaccineNumber
    });

    // const cat = new Cat({
    //     name,
    //     age,
    //     breed
    // });
    // await cat.save();
}

main()