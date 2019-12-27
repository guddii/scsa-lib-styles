// tslint:disable-next-line:no-implicit-dependencies
import { ParamsDictionary } from "express-serve-static-core";

export class Parser {
    public static params(params: ParamsDictionary) {
        // TODO: Use this for route generation
        const defaults = {
            js: "Window",
            endpoint: "Event-driven Consumer",
            construction: "Event Message",
            channel: "Messaging Bridge",
            routing: "None",
            transformation: "None"
        };

        // Clean object from undefined values
        params = JSON.parse(JSON.stringify(params));

        // Enhance URL params with default values
        return (params = { ...defaults, ...params });
    }
}
