const amqp = require("amqplib");

export async function sendMessage() {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queueName = "my-queue";
    const message = "Hello, world!";

    await channel.assertQueue(queueName);
    await channel.sendToQueue(queueName, Buffer.from(message));
    console.log("Message sent:", message);
    await channel.close();
    await connection.close();
}
