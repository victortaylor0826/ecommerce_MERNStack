// config/constants.js

const OrderStatus = Object.freeze({
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
});

module.exports = {
  OrderStatus,
};
