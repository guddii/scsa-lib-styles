import { Dropdown, DropdownItem } from "./view/Dropdown";
import { ParamsDictionary } from "express-serve-static-core";

// TODO: Use this for route generation
const defaults = {
    js: "Window",
    endpoint: "Event-driven Consumer",
    construction: "Event Message",
    channel: "Datatype Channel",
    routing: "None",
    transformation: "None"
};

export class ViewModel {
    viewModel: any;

    constructor(cfg: any, params: ParamsDictionary) {
        // Clean object from undefined values
        params = JSON.parse(JSON.stringify(params));
        // Enhance URL params with default values
        params = { ...defaults, ...params };

        this.viewModel = {
            navigation: {
                items: [
                    {
                        text: "Isolation",
                        items: [
                            new Dropdown({
                                label: "DOM",
                                text: cfg.ORCHESTRATOR.options.text,
                                items: cfg.ORCHESTRATORS
                            }),
                            new Dropdown({
                                label: "JS",
                                text: params.js,
                                items: [
                                    new DropdownItem(
                                        { route: { js: "Window" } },
                                        cfg,
                                        params
                                    ),
                                    new DropdownItem(
                                        { route: { js: "Worker" } },
                                        cfg,
                                        params
                                    )
                                ]
                            })
                        ]
                    },
                    {
                        text: "Messaging",
                        items: [
                            new Dropdown({
                                label: "Endpoints",
                                text: "Event-driven Consumer"
                            }),
                            new Dropdown({
                                label: "Construction",
                                text: "Event Message"
                            }),
                            new Dropdown({
                                label: "Channel",
                                text: params.channel,
                                items: [
                                    new DropdownItem(
                                        {
                                            text: "Datatype Channel",
                                            route: {
                                                channel: "Datatype Channel",
                                                routing: "None"
                                            }
                                        },
                                        cfg,
                                        params
                                    ),
                                    new DropdownItem(
                                        {
                                            text: "Messaging Bridge",
                                            route: {
                                                channel: "Messaging Bridge",
                                                routing: "None"
                                            }
                                        },
                                        cfg,
                                        params
                                    ),
                                    new DropdownItem(
                                        {
                                            text: "Message Bus",
                                            route: {
                                                channel: "Message Bus",
                                                routing: "None"
                                            }
                                        },
                                        cfg,
                                        params
                                    )
                                ]
                            }),
                            new Dropdown({
                                label: "Routing",
                                text: params.routing,
                                items: [
                                    new DropdownItem(
                                        {
                                            text: "Message Broker",
                                            route: {
                                                channel: "None",
                                                routing: "Message Broker"
                                            }
                                        },
                                        cfg,
                                        params
                                    )
                                ]
                            }),
                            new Dropdown({
                                label: "Translator",
                                text: "None"
                            })
                        ]
                    }
                ]
            }
        };
    }
}
