const router = require("express").Router();

router.use("/foods" , require("./foods"));

module.exports = router;