const Sequelize =  require('sequelize')
const { STRING, UUID, UUIDV4 } = Sequelize;
const db = new Sequelize("postgres://localhost/dealers_choice_db");

const categories = [
    { name: "Best Picture" },
    { name: "Cinematography" },
    { name: "Production Design" },
    { name: "Writing (Original Screenplay)" },
    { name: "Sound" },
    { name: "Film Editing" },
  ];

  const Category = db.define("category", {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: STRING,
    },
  });

const syncAndSeed = async () => {
    await db.sync({ force: true });

    const [
      Best_Picture,
      Cinematography,
      Production_Design,
      Original_Screenplay,
      Sound,
      Film_Editing,
    ] = await Promise.all(
      categories.map((category) => Category.create(category))
    );
  
  };

  module.exports = {
    syncAndSeed,
    models: {
      Category,
    },
  };