import * as fs from 'fs'
import VTrackerVideoEventStream from "./services/vtracker";
import Logger from './services/logger';
import type { IVTNotify } from "./services/vtracker/interface/IVTNotify";
import { TypedEmitter } from 'tiny-typed-emitter';
import { IVTrackerNotifyEvent } from './services/vtracker/interface/IVTrackerEvent';
import { status, type } from './services/vtracker/interface/IVTrackerEnum';
export default class VTrackerNotify extends TypedEmitter<IVTrackerNotifyEvent> {
    log: Logger = new Logger("VTracker")
    connection: VTrackerVideoEventStream;
    path: string = "event"

    constructor(option: IVTNotify){
        super();
        
        this.path = option.path

        // Last eventId
        let lastEventId: string = `${Math.ceil(new Date().getTime() / 1000)}-0`;

        // Check path
        if(fs.existsSync(option.path)) lastEventId = fs.readFileSync(option.path, "utf-8")

        // Init VTracker Connection
        this.connection = new VTrackerVideoEventStream({
            stream: option.stream_id,
            token: option.token,
            entity: true,
            resume: lastEventId
        })

        // Register event
        this.register();
    }

    start(){
        this.connection.start();
    }

    register(){
        this.connection.on("error", (err) => {
            this.log.error(`Error! from VTracker library: ` + err);
            console.error(err);
            this.emit('error', err);
        });
        this.connection.on("close", (reason) => {
            this.log.warn("Disconnect from VTracker server");
            this.emit('close', reason);
            process.exit(1);
        });
        this.connection.on("init", (data) => {
            this.log.success("VTracker server has connected.");
            this.log.info(`Connection ID: ${data.connectionId}`);
            this.log.info(`Channel registered count: ${data.streams[0].rules.length}`);
            this.log.info(`Register name: ${data.streams[0].name} [${data.streams[0].description}]`);
            this.emit("ready", data.streams[0])
        })
        this.connection.on("event", (data) => {
            // Save last eventId
            fs.writeFileSync(this.path, data.eventId || "0-0", {
                encoding: "utf-8"
            });
            
            const video = data.video;
            const channel = data.channel;

            if (!data.changesKey || data.changesKey.includes('status')){
                // Check event
                if((video.status === status.published && (video.type === type.upload || video.type == type.live || video.type === type.premiere))) {
                    this.emit("upload", status.published, video, channel);
                }else if(video.status === status.ongoing && video.type === type.premiere){
                    this.emit("premiere", status.ongoing, video, channel);
                }else if(video.status === status.ongoing && video.type === type.live){
                    this.emit("live", status.ongoing, video, channel)
                }else if(video.status === status.upcoming && video.type === type.live){
                    this.emit("live", status.upcoming, video, channel)
                }else if(video.status === status.upcoming && video.type === type.premiere){
                    this.emit("premiere", status.upcoming, video, channel)
                }
            }else{
                this.emit("change", data.changes);
            }
        })
    }
}