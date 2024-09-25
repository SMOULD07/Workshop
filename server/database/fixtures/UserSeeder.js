const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "utilisateur", truncate: true });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    // Generate and insert fake data into the 'user' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake user data
      const fakeUser = {
        Nom: this.faker.internet.userName(), // Generate a fake name using faker library
      };

      // Insert the fakeUser data into the 'user' table
      this.insert(fakeUser); // insert into user(email, password) values (?, ?)
    }
    
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
