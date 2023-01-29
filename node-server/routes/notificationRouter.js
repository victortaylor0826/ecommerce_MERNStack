const express = require("express");
const notificationRouter = express.Router({});

const NotificationModel = require("../data-models/notificationDataModel");

notificationRouter.post("/api/addNotification", (req, res) => {
  console.log("add Notification called");
  let notificationObj = new NotificationModel(req.body.notification);
  notificationObj.save((err, data) => {
    if (err) {
      console.log("err while adding notification", err);
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

notificationRouter.get("/api/getNotifications/:userId", (req, res) => {
  NotificationModel.find({ userId: req.params.userId }, (err, data) => {
    if (err) {
      console.log("err while fetching notification", err);
      res.send(err);
    } else {
      console.log("notificatioin data", data);
      res.send(data);
    }
  });
});

notificationRouter.post("/api/updateSeen", (req, res) => {
  console.log(req.body.id, "id");
  NotificationModel.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { seen: true } },
    (err, data) => {
      if (err) {
        console.log("err while fetching notification", err);
        res.send(err);
      } else {
        console.log("notificatioin data", data);
        res.send(data);
      }
    }
  );
});

module.exports = notificationRouter;
