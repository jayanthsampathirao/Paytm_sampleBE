const express = require("expres");
const userRouter  = require("./user");
const accountRouter = require("./account");

const router = express.Router();
router.use("/user",userRouter);
router.use("/account",accountRouter);

module.exports = router ;

