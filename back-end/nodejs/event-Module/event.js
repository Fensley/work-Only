const events = require("events");

const eventEmitter = new events.EventEmitter();

const eventCall = () => {
  console.log(21 + 3);
};
eventEmitter.on("open", eventCall);
eventEmitter.emit("open");
