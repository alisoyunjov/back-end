const Order = require('../models/Order');
const User = require('../models/User');
createOrder = (req, res) => {
    const body = req.body;

    var today = new Date();
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an order'
        });
    }

    const order = new Order(body);
    
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    order.requestDay = date;

    if (!order) {
        return res.status(400).json({ success: false, error: "Order not created!" });
    }

    order
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: order._id,
                message: 'Order created!',
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err,
                message: 'Order not created!'
            });
        });
}

updateOrder = async (req, res) => {


    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(404).json({
                error: err,
                message: 'Order not found!',
            });
        }
        if (body.price1) order.price1 = body.price1;
        if (body.orderStatus) order.orderStatus = body.orderStatus;
        if (body.price2) order.price2 = body.price2;
        if (body.submission) order.submission = body.submission;
        if (body.receivedDate) order.receivedDate = body.receivedDate;
        if (body.notes) order.notes = body.notes;
        
        order
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: order._id,
                    message: 'Order updated!',
                })
            })
            .catch(err => {
                return res.status(404).json({
                    error: err,
                    message: 'Order not updated!',
                })
            })
    })
}

deleteOrder = async (req, res) => {
    await Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' })
        }
        order.remove().then(() => {
            return res.status(200).json({ success: true })
        });
    }).catch(err => console.log(err));
}

getOrderById = async (req, res) => {
    await Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' })
        }
        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err));
}

getOrders = async (req, res) => {
    await Order.find(req.query.orderMadeBy ? {orderMadeBy: req.query.orderMadeBy} : {}).sort('-createdAt').then(orders => {
        if (!orders) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, data: orders })
    }).catch(err => console.log(err));
}
getAllOrders = async (req, res) => {
    await Order.find({}).sort('-createdAt').then(orders => {
        if (!orders) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, data: orders })
    }).catch(err => console.log(err));
}
getSubmissions = async (req, res) => {
    await Order.find(req.query.submission ? {submission: req.query.submission} : {}).sort('-createdAt').then(orders => {
        if (!orders) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, data: orders })
    }).catch(err => console.log(err));
}
getFinishedOrders = async (req, res) => {
    await Order.find(req.query.orderStatus ? {orderStatus: req.query.orderStatus} : {}).sort('-createdAt').then(orders => {
        if (!orders) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, data: orders })
    }).catch(err => console.log(err));
}


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrderById,
    getAllOrders,
    getSubmissions,
    getFinishedOrders
}