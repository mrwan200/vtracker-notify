import { Interface } from "readline";
import {
    thumbnailResolution,
    playability,
    visibility,
    status,
    type,
} from "./IVTrackerEnum";

interface IVTrackerChange<T> {
    original: T | null;
    current: T | null;
}

export interface IVTrackerThumbnail {
    default: string;
    mqdefault: string;
    hqdefault: string;
    sddefault: string;
    maxresdefault: string;
}

export interface IVTrackerVideoEventStream {
    // Public variables
    stream: number;
    token: string;
    resume: string;
    entity: boolean;

    // Private properties
    _started: boolean;
    _stopping: boolean;
    _reader: Interface;

    start(): void;
    stop(): void;
}

export interface IVTrackerParams {
    stream: number;
    token: string;
    resume: string;
    entity: boolean;
    rules: string;
}

export interface IVTrackerChannel {
    id: string;
    platform: object;
    title: string;
    description: string;
    keywords: Array<string>;

    visibility: visibility;
    customUrl: string;
    country: string;

    avatar: string;
    banner: string;
    externalUrls: Array<string>;

    viewCount: BigInt;
    videoCount: BigInt;
    subscriberCount: BigInt;

    isArtist: boolean;
    isVerified: boolean;
    joined: string;
    createdAt: string;
    updatedAt: string;
}

export interface IVtrackerVideo {
    id: string;
    title: string;
    descerption: string;
    keywords: Array<string>;
    hashtags: Array<string>;

    gameId: string;
    duration: string;

    viewCount: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    channelId: string;

    thumbnailResolution: thumbnailResolution;
    thumbnails: IVTrackerThumbnail;

    visibility: visibility;
    playability: playability;

    isMemberOnly: boolean;
    status: status;
    type: type;

    allowRating: boolean;
    averageRating: number;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
    concurrentViewers: number;
    broadcastStartAt: string;
    broadcastEndAt: string;
}

export interface IVTrackerStreamRules {
    id: number;
    streamId: number;
    operator: string;
    key: string;
    value: string;
    createdAt: Date;
}

export interface IVTrackerStreams {
    id: number;
    userId: number;
    name: string;
    description: string;
    keys: string | null;
    createdAt: Date;
    updatedAt: Date;
    rules: IVTrackerStreamRules[];
}

export interface IVTrackerInit {
    connectionId: string;
    streams: IVTrackerStreams[];
}

export interface IVTrackerChangeData {
    title: IVTrackerChange<string>;
    description: IVTrackerChange<string>;
    keywords: IVTrackerChange<string[]>;
    hashtags: IVTrackerChange<string[]>;
    gameId: IVTrackerChange<string>;
    visibility: IVTrackerChange<visibility>;
    playability: IVTrackerChange<playability>;
    isMemberOnly: IVTrackerChange<boolean>;
    status: IVTrackerChange<status>;
    type: IVTrackerChange<type>;
}

export interface IVTrackerEventData {
    eventId: string;
    auditId: number;
    videoId: string;
    channelId: string;
    changes?: IVTrackerChangeData;
    changesKey?: string[];
    video: IVtrackerVideo;
    channel: IVTrackerChannel;
}
