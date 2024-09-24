const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)

class SuggestionSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "suggestion", truncate: true });
  }

  // The run method - Populate the 'item' table with fake data

  run() {
    const suggestions = [
      {
        Titre: "suggestion 2",
        Description: "Lorem ipsum dolor sit amet",
      },
      {
        Titre: "suggestion 3",
        Description: "Lorem ipsum dolor sit amet",
      },
      {
        Titre: "suggestion 4",
        Description: "Lorem ipsum dolor sit amet",
      },
      {
        Titre: "suggestion 5",
        Description: "Lorem ipsum dolor sit amet",
      },
    ];

    suggestions.forEach((suggestion) => {
      this.insert(suggestion);
    });
  }
}

// Export the ItemSeeder class
module.exports = SuggestionSeeder;

