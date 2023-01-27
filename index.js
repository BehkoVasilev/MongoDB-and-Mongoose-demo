const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must contain a name!']
    },
    age: {
        type: Number,
        min: 0,
        max: 22
    },
    breed: {
        type: String,
        enum: ['himalayan', 'korat', 'angora', 'persian', 'streetcat', 'abyssinian']
    },
    vaccineNumber: {
        type: String,
        requred: [true, 'You must enter a vaccine number!'],
        validate: {
            validator: function (v) {
                return /VAC[0-9]{3}-[0-9]{4}/.test(v);
            },
            message: props => `${props.value} is not a valid vaccine number!`
        },
    }
});

// add method
catSchema.methods.sayMeow = function () {
    console.log(`Hello my name is ${this.name} - Meow...`);
};

// Virtual property
catSchema.virtual('info').get(function () {
    console.log(`${this.name} - ${this.age} age, ${this.breed}.`);
});



const Cat = mongoose.model('Cat', catSchema);

async function main() {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://127.0.0.1:27017/catShelter");

    console.log("Database connected!");
    // await Cat.deleteMany({name: "Misho"});
    await createCat("Teddy", 16, "korat", "VAC323-3213")

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