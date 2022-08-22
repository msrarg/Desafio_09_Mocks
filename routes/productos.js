const { Router } = require('express');
const { productosTest, productosTestView } = require('../controller/productosFake');

const router = Router();

router.get('/', productosTest)
router.get('/view', productosTestView)

module.exports = router;
