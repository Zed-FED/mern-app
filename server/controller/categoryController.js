const Category = require("../model/categoryModal");

exports.addCategory = async function (req, res) {
  let category = new Category(req.body);

  const result = await category.save();

  if (!result) {
    res.json({
      status: "FAIL",
      message: "Category not registered",
    });
  } else {
    res.json({
      status: "SUCCESS",
      message: "Category registered",
      data: result,
    });
  }
};

exports.getSingleCategory = async function (req, res) {
  try {
    const _id = req.params.id;
    const result = await Category.findById(_id);
    if (!result) {
      res.json({
        status: "FAIL",
        message: "No category found",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "Category found",
        data: result,
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.getAllCategories = async function (req, res) {
  try {
    const result = await Category.find();
    if (!result) {
      res.json({
        status: "FAIL",
        message: "No category found",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "Categories found",
        data: result,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.editCategory = async function (req, res) {
  try {
    const _id = req.params.id;
    const result = await Category.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!result) {
      res.json({
        status: "FAIL",
        message: "Category not updated",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "Category updated successfully",
        data: result,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteCategory = async function (req, res) {
  try {
    const _id = req.params.id;
    const result = await Category.findByIdAndDelete(_id);
    if (!result) {
      res.json({
        status: "FAIL",
        message: "Category not deleted",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "Category deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
