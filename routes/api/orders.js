// const express = require('express');

// const OrderCtrl = require('../../controllers/orderCtrl');
// const passport = require('passport');
// const router = express.Router();

// router.post('/', passport.authenticate('jwt', { session: false }), OrderCtrl.createOrder);
// router.put('/:id', passport.authenticate('jwt', { session: false }), OrderCtrl.updateOrder);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), OrderCtrl.deleteOrder);
// router.get('/:id', OrderCtrl.getOrderById);
// router.get('/', OrderCtrl.getOrders);

// module.exports = router;
const express = require('express');

const OrderCtrl = require('../../controllers/OrderCtrl');
const passport = require('passport');
const router = express.Router();

//router.get('/trending', EventCtrl.getTrending);
router.post('/MakeOrder', OrderCtrl.createOrder)
//router.post('/CreateEvent', passport.authenticate('jwt', { session: false }), EventCtrl.createEvent);
// router.put('/:id', passport.authenticate('jwt', { session: false }), EventCtrl.updateEvent);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), EventCtrl.deleteEvent);
// router.get('/:id', EventCtrl.getEventById);
// router.put('/:id/join', passport.authenticate('jwt', { session: false }), EventCtrl.joinEvent);
router.get('/', OrderCtrl.getOrders);
router.get('/allOrders', OrderCtrl.getAllOrders);
router.get('/getSubmissions', OrderCtrl.getSubmissions);
router.get('/getFinishedOrders', OrderCtrl.getFinishedOrders);
router.put('/order/:id', OrderCtrl.updateOrder)
router.delete('/order/:id', OrderCtrl.deleteOrder)
router.get('/order/:id', OrderCtrl.getOrderById)

module.exports = router;