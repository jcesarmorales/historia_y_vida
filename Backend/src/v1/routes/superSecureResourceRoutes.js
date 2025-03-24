const express = require("express");

const superSecureResourceController = require("../../controllers/superSecureResourceController");

const router = express.Router();

router.get("/super-secure-resources", superSecureResourceController.getSuperSecureResource);

module.exports = router;
