const mongoose = require('mongoose')
if (process.argv.length < 3) {
  console.log('Enter password')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fsolawblo:${password}@phonebook0.rfqn3wi.mongodb.net/phonebookApp?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
  //print members
  console.log('phonebook:')
  Person
    .find({})
    .then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })

} else {
  //add member
  const new_name = process.argv[3]
  const new_number = process.argv[4]

  const person = new Person({
    name: new_name,
    number: new_number,
  })

  person.save().then(result => {
    console.log(result)
    console.log(`added ${new_name} number ${new_number} to phonebook`)
    mongoose.connection.close()
  })
}

