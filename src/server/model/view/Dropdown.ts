import * as global from "@scsa/global";
import { ParamsDictionary } from "express-serve-static-core";

interface DropdownOptions {
    label: string;
    text: string;
    items?: DropdownItem[];
}

export class Dropdown {
    private label: string;
    private text: string;
    private items: DropdownItem[];

    constructor(options: DropdownOptions) {
        this.label = options.label;
        this.text = options.text;
        this.items = options.items;
    }
}

interface Route {
    js?: string;
    endpoint?: string;
    construction?: string;
    channel?: string;
    routing?: string;
    transformation?: string;
}

interface DropdownItemOptions {
    text?: string;
    url?: URL;
    route?: Route;
    dom?: string;
}

function buildURL(params: ParamsDictionary, overwrite: Route, cfg: any) {
    const string = {
        ...params,
        ...overwrite
    };
    return new URL(
        // Replace with parameter
        cfg.CURRENT.options.url.href +
        Object.values(string)
            .map(i => encodeURIComponent(i))
            .join("/")
    );
}

export class DropdownItem extends global.Application {

    constructor(options: DropdownItemOptions,  cfg: any, params?: ParamsDictionary, ) {
        super({
            text: options.text || Object.values(options.route).join(),
            url: options.url || buildURL(params, options.route, cfg)
        });
    }

}
