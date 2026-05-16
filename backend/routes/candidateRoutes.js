const express = require("express");
const {
  addCandidate,
  getCandidates,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidateController");

const router = express.Router();

router.post("/", addCandidate);
router.get("/", getCandidates);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);

module.exports = router;