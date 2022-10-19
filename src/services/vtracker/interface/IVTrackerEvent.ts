import {
    IVTrackerChangeData,
    IVTrackerChannel,
    IVTrackerEventData,
    IVTrackerInit,
    IVTrackerStreams,
    IVtrackerVideo,
} from "./IVTracker";
import { status } from "./IVTrackerEnum";

export interface IVTrackerEvent {
    init: (data: IVTrackerInit) => void;
    event: (data: IVTrackerEventData) => void;
    ping: () => void;
    close: (reason: any) => void;
    error: (err: any) => void;
}

export interface IVTrackerNotifyEvent {
    // Event
    ready: (data: IVTrackerStreams) => void;
    close: (reason: any) => void;
    error: (err: any) => void;

    // Notify
    upload: (
        type: status,
        video: IVtrackerVideo,
        channel: IVTrackerChannel
    ) => void;
    premiere: (
        type: status,
        video: IVtrackerVideo,
        channel: IVTrackerChannel
    ) => void;
    live: (
        type: status,
        video: IVtrackerVideo,
        channel: IVTrackerChannel
    ) => void;
    upcoming: (
        type: status,
        video: IVtrackerVideo,
        channel: IVTrackerChannel
    ) => void;

    // Change 
    change: (change: IVTrackerChangeData) => void;
}
