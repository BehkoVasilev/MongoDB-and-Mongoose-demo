const mongoose = require('mongoose');

const Cat = require('./models/Cat');

const validateVacNumErrorMessage = 'invalid vaccination number';

async function main() {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://127.0.0.1:27017/catShelter");

    console.log("Database connected!");

    const vacNum = "VAC323-9323"
    const cats = await readCats(vacNum);
    if (cats.length == 0) {
        console.log(`"${vacNum}" - ${validateVacNumErrorMessage}`)
    } else {
        cats.forEach(cat => {
            cat.sayMeow(),
                cat.info
        })
    }
    // await Cat.deleteMany({name: "Misho"});
    // await createCat("Nav", 11, "abyssinian", "VAC344-1210");
    // await Cat.deleteOne({name: 'Teddy'});
    let oneCat = await readCat("VAC323-3213");
    console.log(oneCat);
    updateCat('Misho', 'Mishiii')
    uptadeCatbyId('63d41223fd99f64be3dd46de', 'Gosho-Chochko');

    // Cat
    //     .find({})
    //     .where('age')
    //     .gt(7)
    //     .lt(16)
    const findCat = await Cat.find({ age: { $gt: 4, $lt: 16 } }).sort({age:-1});
    console.log(findCat);
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

async function readCats(value) {
    const cats = await Cat.find({
        vaccineNumber: {
            "$regex": `${value}`,
            "$options": "i"
        }
    });

    if (cats.length > 0) {
        console.log(...cats);
    }

    return cats
};

async function readCat(value) {
    const cat = await Cat.findOne({
        vaccineNumber: {
            "$regex": `${value}`,
            "$options": "i"
        }
    });
    // const cat = await Cat.findById("63d41223fd99f64be3dd46de");
    if (!cat) {
        return new Error(`"${value}" - ${validateVacNumErrorMessage}`)
    }

    return cat
}

async function updateCat(name, newName) {
    await Cat.updateOne({ name }, { name: newName });
};
async function uptadeCatbyId(id, newName) {
    await Cat.findByIdAndUpdate(id, { name: newName });
}

main()