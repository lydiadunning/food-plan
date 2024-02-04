const OutcomeTipArray = require("../models/outcomeTipArray.js");
const outcomeTipRouter = require("express").Router();

// get all active outcome tips in OutcomeTipArray
outcomeTipRouter.get("/", async (request, response) => {
  const tips = await OutcomeTipArray.findOne();
  //.populate('outcomeTips')

  response.json(tips);
});

// add all outcome tips, expects an array in the request body
outcomeTipRouter.post("/", async (request, response) => {
  // add the array to db
  const outcomeArray = new OutcomeTipArray(request.body);
  const finalResult = await outcomeArray.save();
  response.status(201).json(finalResult);
});

// limit to admin access
outcomeTipRouter.delete("/", async (request, response) => {
  await OutcomeTipArray.deleteMany({});
  response.status(204).end();
});

module.exports = outcomeTipRouter;
