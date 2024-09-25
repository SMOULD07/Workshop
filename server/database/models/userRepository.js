/* eslint-disable camelcase */
const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "utilisateur" as configuration
    super({ table: "utilisateur" });
  }

  // The C of CRUD - Create operation

  async create(user, Role = "etudiant") {
    // Execute the SQL INSERT query to add a new user to the "utilisateur" table
    const [result] = await this.database.query(
      `insert into ${this.table} (nom, mdp, role) values (?, ?, ?)`,
      [user.Nom, user.Mdp, Role]
    );
    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(ID_utilisateur) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where ID_utilisateur = ?`,
      [ID_utilisateur]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async isUserExist(user) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where nom = ?`,
      [user.Nom]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async delete(ID_utilisateur) {
    const [result] = await this.database.query(
      `delete from ${this.table} where ID_utilisateur = ?`,
      [ID_utilisateur]
    );
    return result;
  }

  async update(utilisateur) {
    const userId = parseInt(utilisateur.ID_utilisateur, 10);
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET Nom = ?, WHERE id = ?`,
      [utilisateur.Nom, userId]
    );
    return result;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(user) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = UserRepository;
