const express = require("express");
const router = express.Router();
const Test = require("../models/test");

//All
router.get("/", async (req, res) => {
    try{
        const tests = await Test.find({})
        console.log(tests)
        res.render("tests/index", {tests: tests});
    }catch{
        res.redirect('/')
    }
});

//New
router.get("/new", (req, res) => {
  res.render("tests/new", { test: new Test() });
});

router.post("/", async (req, res) => {
  const test = new Test({
    name: req.body.name,
  });
  try {
    const newTest = await test.save()
    res.redirect('/test')


  } catch {
    res.render("tests/new", {
      test: test,
      errorMessage: "Error",
    });
  }
});

module.exports = router;
