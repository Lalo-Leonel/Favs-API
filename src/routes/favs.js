const router = require('express').Router();
const { create, list, show, update, destroy } = require('../controllers/favs');

router.route('/').post(create).get(list);
router.route('/:favId').get(show).put(update).delete(destroy);

module.exports = router;