const express = require('express');
const router = express.Router();
const Dashboard = require('../models/Dashboard');

// Create or Update Dashboard Data
router.post('/', async (req, res) => {
    try {
        const { incomeExpenses, payments, orders, orderTypes } = req.body;

        // Upsert (update or insert) Dashboard data
        const result = await Dashboard.findOneAndUpdate(
            {},
            { incomeExpenses, payments, orders, orderTypes },
            { upsert: true, new: true }
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error saving dashboard data' });
    }
});

// Get Dashboard Data
router.get('/', async (req, res) => {
    try {
        const dashboardData = await Dashboard.findOne();
        res.status(200).json(dashboardData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching dashboard data' });
    }
});

// Filter Dashboard Data
router.get('/filter', async (req, res) => {
    const { startDate, endDate, filterType } = req.query;

    try {
        const dashboardData = await Dashboard.findOne();

        const parseDate = (date) => new Date(date).toISOString().split('T')[0];
        const start = new Date(startDate);
        const end = new Date(endDate);

        const filteredIncomeExpenses = dashboardData.incomeExpenses.filter(entry =>
            new Date(entry.date) >= start && new Date(entry.date) <= end
        );

        const filteredPayments = dashboardData.payments.filter(payment =>
            new Date(payment.date) >= start && new Date(payment.date) <= end
        );

        const filteredOrders = {
            delivered: dashboardData.orders.delivered.filter(order =>
                new Date(order.date) >= start && new Date(order.date) <= end
            ),
            returned: dashboardData.orders.returned.filter(order =>
                new Date(order.date) >= start && new Date(order.date) <= end
            )
        };

        const filteredOrderTypes = {
            online: dashboardData.orderTypes.online.filter(order =>
                new Date(order.date) >= start && new Date(order.date) <= end
            ),
            offline: dashboardData.orderTypes.offline.filter(order =>
                new Date(order.date) >= start && new Date(order.date) <= end
            )
        };

        res.status(200).json({
            incomeExpenses: filteredIncomeExpenses,
            payments: filteredPayments,
            orders: filteredOrders,
            orderTypes: filteredOrderTypes
        });
    } catch (error) {
        res.status(500).json({ error: 'Error filtering dashboard data' });
    }
});

module.exports = router;
