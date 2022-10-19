import VTrackerNotify from "./client";

// Load .env file
require('dotenv').config()

const client = new VTrackerNotify({
    stream_id: Number(process.env.STREAMID),
    token: process.env.TOKEN,
    path: 'event'
})

// Event
client.on("ready", (user) => {
    console.log(user)
})
client.on("error", (err) => {
    console.log(err)
})
client.on("close", (reason) => {
    console.log(reason)
})

// Notify
client.on("upload", (type, video, channel) => {
    console.log(type, video, channel)
})
client.on("premiere", (type, video, channel) => {
    console.log(type, video, channel)
})
client.on("live", (type, video, channel) => {
    console.log(type, video, channel)
})
client.on("upcoming", (type, video, channel) => {
    console.log(type, video, channel)
})

// Change data
client.on("change", (data) => {
    console.log(data)
})

client.start()