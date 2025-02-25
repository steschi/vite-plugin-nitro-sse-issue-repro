import { createEventStream, defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  const eventStream = createEventStream(event);

  // Send a message every second
  const interval = setInterval(async () => {
    await eventStream.push("Hello world");
  }, 1000);
  // cleanup the interval and close the stream when the connection is terminated
  eventStream.onClosed(async () => {
    console.log("closing SSE...");
    clearInterval(interval);
    await eventStream.close();
  });

  return eventStream.send();
});
