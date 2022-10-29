const { request, response } = require("express");
const Category = require("../models/category");

const getCategories = async (req = request, res = response) => {
  try {
    let { from = 0, lot = 5 } = req.query;
    from = from <= 0 || isNaN(from) ? 0 : from - 1;

    const query = { status: true };

    const [categories, total] = await Promise.all([
      Category.find(query).skip(from).limit(lot),
      Category.countDocuments(query),
    ]);

    req.res.status(200).json({
      total,
      categories,
      from: from + 1,
      lot: Number(lot),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const createCategory = async (req = request, res = response) => {
  try {
    const name = req.body.name.trim().toUpperCase()

    const categoriDb = await Category.findOne({ name })
    if(categoriDb){
        return res.status(400).json({
            msg: `La categoria ${name} ya existe en la BD`
        })
    }


    const data = {
        name,
        user: req.authenticatedUser,
    }

     const category = new Category(data)


    await category.save();

    res.status(201).json({
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = { getCategories, createCategory };
