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
        enum: {
            values: ['himalayan', 'korat', 'angora', 'persian', 'streetcat', 'abyssinian'],
            message: `{VALUE} - not listed.`
        }
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

module.exports = mongoose.model('Cat', catSchema);
