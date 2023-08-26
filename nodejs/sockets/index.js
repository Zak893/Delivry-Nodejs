const createError = require('http-errors');
const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
const Delivery = require('../models/DeliveryModel');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.emit('connection', null);

        socket.on('placeOrder', async ({ userId, orderId }) => {
            try {
                const id = orderId;
                const User = await User.findById(userId);
                const order = await Order.findById(id).populate(
                    'products currentProduct'
                );

                if (!order) throw new Error('Order not found');
                if (!order.customers.includes(userId)) {
                    throw new Error('User not associated with order');
                }


                socket.emit('placeOrderResponse', {
                    success: true,
                    message: 'Order placed successfully',
                    order,
                });
            } catch (error) {
                socket.emit('placeOrderResponse', {
                    success: false,
                    message: error.message,
                });
            }
        });

        socket.on('assignDelivery', async ({ UserId }) => {
            try {

                socket.emit('assignDeliveryResponse', {
                    success: true,
                    message: 'Delivery assigned successfully',
                });
            } catch (error) {
                socket.emit('assignDeliveryResponse', {
                    success: false,
                    message: error.message,
                });
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};


