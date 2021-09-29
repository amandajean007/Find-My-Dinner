const sequelize = require('../config/connection');
const { User, Recipe } = require('../models');

const userData = require('./userData.json');
const recipeData = require('./RecipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const Recipe of recipeData) {
    await Recipe.create({
      ...Recipe,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();