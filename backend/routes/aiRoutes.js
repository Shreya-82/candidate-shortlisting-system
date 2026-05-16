const express = require("express");
const { aiShortlistCandidates } = require("../controllers/aiController");

const router = express.Router();

router.post("/shortlist", aiShortlistCandidates);

module.exports = router;