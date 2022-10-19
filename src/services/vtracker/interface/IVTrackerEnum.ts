export enum thumbnailResolution {
    default     = 'default',
    medium      = 'medium',
    high        = 'high',
    standard    = 'standard',
    max         = 'max'
}

export enum playability {
    playable                = 'playable',
    loginRequired           = 'loginRequired', 
    removed                 = 'removed',
    unavailable             = 'unavailable',
    memberOnly              = 'memberOnly',
    ageRestricted           = 'ageRestricted',
    violating               = 'violating',
    copyrightStrike         = 'copyrightStrike',
    copyrightClaim          = 'copyrightClaim',
    recordingNotAvailable   = 'recordingNotAvailable', 
    channelTerminated       = 'channelTerminated',
    channelClosed           = 'channelClosed'
}

export enum visibility {
    // Video
    public      = 'public',
    unlisted    = 'unlisted',
    private     = 'private',
    unavailable = 'unavailable',

    // Channel
    notExists       = 'notExists',
    terminated      = 'terminated',
    suspended       = 'suspended',
    notAvailable    = 'notAvailable',
    unknown         = 'unknown'
}

export enum status {
    published   = 'published', 
    upcoming    = 'upcoming',
    ongoing     = 'ongoing',
}

export enum type {
    upload      = 'upload', 
    live        = 'live',
    premiere    = 'premiere'
}