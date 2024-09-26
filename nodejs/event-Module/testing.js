// * events testing

const events = require("events");
const eventEmitter = new events.EventEmitter();

const handleevent = (call) => {
  const math = call + 1;
  console.log(math);
};

eventEmitter.on("open", () => handleevent(10));
eventEmitter.emit("open");
