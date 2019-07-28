const express = require("express");
const router = express.Router();
const queries = require("../db/queries");

// middleware to check where input value are valid or not
function isValidid(req, res, next) {
  !isNaN(req.params.id) ? next() : next(new Error("invalid ID"));
}

router.get("/", (req, res) => {
  queries.getAll().then(drums => {
    res.json(drums);
  });
});

router.get("/:idOrName", (req, res, next) => {
  const idOrName = req.params.idOrName;
  if (Number(idOrName)) {
    queries.getOneById(idOrName).then(drum => {
      if (drum) {
        res.json(drum);
      } else {
        res.status(404);
        next();
      }
    });
  } else if (typeof idOrName === "string") {
    queries.getByName(idOrName).then(drums => {
      if (drums) {
        res.json(drums);
      } else {
        res.status(404);
        next();
      }
    });
  }
});

router.post("/", (req, res) => {
  queries.addOne(req.body).then(drums => {
    res.json(drums);
  });
});

router.patch("/:id", (req, res) => {
  queries.updateOne(req.params.id, req.body).then(drum => {
    res.json(drum);
  });
});

// router.put("/:id", isValidid, (req, res) => {
//   queries.replaceOne(req.body).then(drums => {
//     if (drums) res.json(drums);
//   });
// });

router.delete("/:idOrName", (req, res, next) => {
  const idOrName = req.params.idOrName;
  if (Number(idOrName)) {
    queries.deleteOneById(idOrName).then(drums => {
      if (drums) {
        res.json(drums);
      } else {
        res.status(404);
        next();
      }
    });
  } else if (typeof idOrName === "string") {
    queries.deleteOneByName(idOrName).then(drums => {
      if (drums) {
        res.json(drums);
      } else {
        res.status(404);
        next();
      }
    });
  } else {
    res.status(404);
    next();
  }
});

module.exports = router;
