const Kid = require("../models/kid.js");
const User = require("../models/user.js");
const kidRouter = require("express").Router();
const logger = require("../utils/logger.js");

kidRouter.get("/", async (request, response) => {
  const kids = await Kid.find({ users: request.user });
  console.log({kids})
  kids.forEach((kid) => {
    console.log('kid.entries', kid.entries)
    // inefficient. alternative approach to sorting here is keeping the list in order.
    kid.entries.sort((a, b) => {
      return b.date.valueOf() - a.date.valueOf();
    });
  });
  response.json(kids);
});

/**
 * request.body: {
 *   name: String
 *   outcomes: Array [
 *     Objects {
 *       outcome: String (optional)
 *       isActive: Boolean (optional)
 *     }
 *   ]
 * }
 */
kidRouter.post("/", async (request, response) => {
  // return 400 error if request body missing vital info
  // name exists, contains characters
  if (!request.body.name) {
    response.status(400).end();
  }

  try {
    const user = request.user;

    const outcomeOptions = request.body.outcomeOptions || [];
    const kid = new Kid({
      name: request.body.name,
      outcomeOptions: outcomeOptions,
      users: [user.id],
    });
    const result = await kid.save();
    await user.updateOne({ $push: { kids: kid.id } }, { upsert: true });
    user.save();

    response.status(201).json(result);
  } catch (err) {
    console.error(err.message);
    response.status(404).end();
    // return some explanatory text
  }
});

kidRouter.get("/:id", async (request, response) => {
  const kid = await Kid.findById(request.params.id);

  if (kid && kid.users.includes(request.user.id)) {
    response.json(kid);
  } else {
    response.status(404).json({ error: "child not found" }).end();
  }
});

// Should allow a user to remove the link between their profile and a kid, but not delete the kid until it has no remaining ties to any user. Currently doesn't actually delete database record.
kidRouter.delete("/:id", async (request, response) => {
  try {
    await Kid.findByIdAndUpdate(
      request.params.id,
      {
        $pull: {
          users: request.user.id,
        },
      },
      {
        new: true,
      },
    );
    // // const kid = await Kid.find({ id: request.params.id, user: request.user })
    // // const kid = await Kid.findById(request.params.id )

    // response.status(200).json(kid)
    // const users = kid.users.filter( user => user !== request.user )
    // response.status(204).json({users: users})

    await User.findByIdAndUpdate(request.user.id, {
      $pull: {
        kids: request.params.id,
      },
    });
    response.status(204).end();
  } catch {
    response.status(204).end();
    // response.status(400)
    // this seems like a really dumb solution and I hate it.
  }
});

kidRouter.delete("/all", async (request, response) => {
  if (request.user.isAdmin) {
    const kid = await Kid.deleteMany();
    response.status(204).end();
  }
});

// patch will accept a request describing any field in the kid model.
kidRouter.patch("/:id", async (request, response, next) => {
  const kid = await Kid.findById(request.params.id);

  if (kid && kid.users.includes(request.user.id)) {
    try {
      const kid = await Kid.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
      });

      response.status(200).json(kid);
    } catch (error) {
      next(error);
    }
  } else {
    response.status(404).json({ error: "child not found" }).end();
  }

  // simplified this. If it needs more sophistication, this resource might help
  // Jonathan Muller's answer:
  // https://stackoverflow.com/questions/35810951/how-to-change-order-of-array-with-mongodb
});

// does the app even need this?
kidRouter.get("/:kidId/outcomeOptions", async (request, response) => {
  const kid = await Kid.findById(request.params.kidId).populate(
    "outcomeOptions",
    { outcome: 1, id: 1, active: 1 },
  );
  if (kid) {
    response.json(kid.outcomeOptions);
  } else {
    response.status(404).end();
  }
});

kidRouter.get("/:kidId/entry", async (request, response) => {
  const kid = await Kid.findById(request.params.kidId)
    .populate("entries")
    .sort({ date: 1 });
  if (kid) {
    response.json(kid.entries);
  } else {
    response.status(404).end();
  }
});

kidRouter.patch("/:kidId/entry", async (request, response) => {
  const kid = await Kid.findById(request.params.kidId);
  if (kid) {
    const date = new Date();
    const entry = { ...request.body, date: date };
    // return 400 error if request body missing vital info
    kid.entries.push(entry);
    const result = await kid.save();
    response.status(201).json(entry);
  } else {
    logger.info("kid not found");
    response.status(404).end();
  }
});

kidRouter.get("/:kidId/entry/:id", async (request, response) => {
  const kid = await Kid.findById(request.params.kidId);
  const entry = kid.entries.find(
    (entry) => entry.id === request.params.id,
  );

  if (entry) {
    response.json(entry);
  } else {
    response.status(404).end();
  }
});

kidRouter.patch("/:kidId/entry/:id", async (request, response) => {
  const kid = await Kid.findById(request.params.kidId);
  const entryIndex = kid.entries.findIndex(
    (entry) => entry.id === request.params.id,
  );

  if (entryIndex >= 0) {
    Object.keys(request.body).forEach((key) => {
      kid.entries[entryIndex][key] = request.body[key];
    });
    await kid.save();

    response.json(kid.entries[entryIndex]);
  } else {
    response.status(404).end();
  }
});

kidRouter.delete("/:kidId/entry/:id", async (request, response) => {
  const kid = await Kid.findById(request.params.kidId);
  kid.entries = kid.entries.filter(
    (entry) => entry.id !== request.params.id,
  );
  await kid.save();
  response.status(204).end();
});

module.exports = kidRouter;
