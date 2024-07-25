const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    incomeExpenses: [
        {
            type: {
                type: String, // 'income' or 'expense'
                required: true,
                enum: ['income', 'expense']
            },
            amount: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                required: true
            }
        }
    ],
    payments: [
        {
            mode: {
                type: String, //'credit card', 'debit card', 'online'
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                required: true
            }
        }
    ],
    orders: {
        delivered: [
            {
                count: {
                    type: Number,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                }
            }
        ],
        returned: [
            {
                count: {
                    type: Number,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                }
            }
        ]
    },
    orderTypes: {
        online: [
            {
                count: {
                    type: Number,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                }
            }
        ],
        offline: [
            {
                count: {
                    type: Number,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                }
            }
        ]
    }
}, { timestamps: true });

const Dashboard = mongoose.model("Dashboard", DashboardSchema);

module.exports = Dashboard;
