const router = require("express").Router();
const { create, list, show, destroy } = require("../controllers/favsLists");
const { auth } = require("../utils/auth");

router.route("/").post(auth, create).get(auth, list);
router.route("/:id").get(show).delete(auth, destroy);

module.exports = router;
