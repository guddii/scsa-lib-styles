import { Request } from "express";
import { Dropdown } from "./view/Dropdown";
import { buildURL, DropdownItem } from "./view/DropdownItem";

export class ViewModel {
    public viewModel: any;

    constructor(cfg: any, req: Request) {
        this.viewModel = {
            navigation: {
                items: [
                    {
                        items: [
                            new Dropdown(this.dom(cfg, req)),
                            new Dropdown(this.js(cfg, req))
                        ],
                        text: "Isolation"
                    },
                    {
                        items: [
                            new Dropdown(this.endpoint(cfg, req)),
                            new Dropdown(this.construction(cfg, req)),
                            new Dropdown(this.channel(cfg, req)),
                            new Dropdown(this.routing(cfg, req)),
                            new Dropdown(this.transformation(cfg, req))
                        ],
                        text: "Messaging"
                    }
                ]
            }
        };
    }

    private dom(cfg: any, req: Request) {
        return {
            items: [
                new DropdownItem(
                    {
                        text: cfg.ORCHESTRATORS.Compoxure.options.text,
                        url: buildURL(
                            req.params,
                            {},
                            cfg.ORCHESTRATORS.Compoxure
                        )
                    },
                    cfg,
                    req.params
                ),
                new DropdownItem(
                    {
                        text: cfg.ORCHESTRATORS.iFrame.options.text,
                        url: buildURL(
                            req.params,
                            {
                                channel: "Messaging Bridge",
                                js: "Window",
                                routing: "None"
                            },
                            cfg.ORCHESTRATORS.iFrame
                        )
                    },
                    cfg,
                    req.params
                ),
                new DropdownItem(
                    {
                        text: cfg.ORCHESTRATORS.WebComponents.options.text,
                        url: buildURL(
                            req.params,
                            {},
                            cfg.ORCHESTRATORS.WebComponents
                        )
                    },
                    cfg,
                    req.params
                )
            ],
            label: "DOM",
            text: cfg.CURRENT.options.text
        };
    }

    private js(cfg: any, req: Request) {
        const model = {
            items: undefined,
            label: "JS",
            text: req.params.js
        };
        if (cfg.KEY !== "iFrame") {
            model.items = [
                new DropdownItem(
                    {
                        route: {
                            channel: "Messaging Bridge",
                            js: "Window",
                            routing: "None"
                        },
                        text: "Window"
                    },
                    cfg,
                    req.params
                ),
                new DropdownItem(
                    {
                        route: {
                            channel: "None",
                            js: "Worker",
                            routing: "Message Broker"
                        },
                        text: "Worker"
                    },
                    cfg,
                    req.params
                )
            ];
        }
        return model;
    }

    private channel(cfg: any, req: Request) {
        const model = {
            items: undefined,
            label: "Channel",
            text: req.params.channel
        };
        if (cfg.KEY !== "iFrame") {
            model.items = [
                //     new DropdownItem(
                //         {
                //             text: "Datatype Channel",
                //             route: {
                //                 channel: "Datatype Channel",
                //                 routing: "None"
                //             }
                //         },
                //         cfg,
                //         req.params
                //     ),
                new DropdownItem(
                    {
                        route: {
                            channel: "Messaging Bridge",
                            js: "Window",
                            routing: "None"
                        },
                        text: "Messaging Bridge"
                    },
                    cfg,
                    req.params
                ),
                new DropdownItem(
                    {
                        route: {
                            channel: "Message Bus",
                            js: "Window",
                            routing: "None"
                        },
                        text: "Message Bus"
                    },
                    cfg,
                    req.params
                )
            ];
        }

        return model;
    }

    private routing(cfg: any, req: Request) {
        const model = {
            items: undefined,
            label: "Routing",
            text: req.params.routing
        };

        if (cfg.KEY !== "iFrame") {
            model.items = [
                new DropdownItem(
                    {
                        route: {
                            channel: "None",
                            js: "Worker",
                            routing: "Message Broker"
                        },
                        text: "Message Broker"
                    },
                    cfg,
                    req.params
                )
            ];
        }
        return model;
    }

    private endpoint(cfg: any, req: Request) {
        return {
            label: "Endpoints",
            text: req.params.endpoint
        };
    }

    private construction(cfg: any, req: Request) {
        return {
            label: "Construction",
            text: req.params.construction
        };
    }

    private transformation(cfg: any, req: Request) {
        return {
            label: "Translator",
            text: req.params.transformation
        };
    }
}
