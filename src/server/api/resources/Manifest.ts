export enum Display {
    "browser",
    "fullscreen",
    "minimal-ui",
    "standalone"
}

export enum Orientation {
    "landscape",
    "portrait"
}

export interface IManifestIcons {
    sizes: string
    src: string;
    type: string;
}

export interface IManifestOptions {
    background_color?: string;
    display?: string;
    icons?: IManifestIcons[]
    name: string;
    orientation?: string;
    scope?: string;
    short_name: string;
    start_url?: string;
    theme_color?: string;
}

const defaults: IManifestOptions = {
    background_color: "#fafafa",
    display: Display[Display.standalone],
    icons: [{
        "sizes": "192x192",
        "src": "icon.png",
        "type": "image/png"
    }],
    name: "Application",
    short_name: "App",
    start_url: "/?utm_source=homescreen",
    theme_color: "#fafafa"
};

export class Manifest {

    private readonly options: IManifestOptions;

    constructor(options: IManifestOptions) {
        this.options = { ...defaults, ...options };
    }

    public get() {
        return JSON.stringify(this.options);
    }

}
