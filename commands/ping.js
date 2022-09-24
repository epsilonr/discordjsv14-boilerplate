module.exports = {
    cmd: "ping",
    run: (msg) => {
        msg.channel.send(`Pong, ${msg.author}!`);
    }
}