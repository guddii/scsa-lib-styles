import { Request } from "express";
import { Dropdown } from "./view/Dropdown";
import { buildURL, DropdownItem } from "./view/DropdownItem";

export class ViewModel {
    private static dom(cfg: any, req: Request) {
        return {
            items: [
                new DropdownItem(
                    {
                        text: cfg.ORCHESTRATORS.Nodesi.options.text,
                        url: buildURL(
                            req.params,
                            {},
                            cfg.ORCHESTRATORS.Nodesi
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

    private static js(cfg: any, req: Request) {
        const model = {
            items: undefined,
            label: "JS",
            text: (cfg.KEY === "Nodesi") ? "None" : req.params.js
        };
        if (cfg.KEY === "WebComponents") {
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

    private static channel(cfg: any, req: Request) {
        const model = {
            items: undefined,
            label: "Channel",
            text: (cfg.KEY === "Nodesi") ? "None" : req.params.channel
        };
        if (cfg.KEY === "WebComponents") {
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

    private static routing(cfg: any, req: Request) {
        const model = {
            items: undefined,
            label: "Routing",
            text: (cfg.KEY === "Nodesi") ? "None" : req.params.routing
        };

        if (cfg.KEY === "WebComponents") {
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

    private static endpoint(cfg: any, req: Request) {
        return {
            label: "Endpoints",
            text: (cfg.KEY === "Nodesi") ? "None" : req.params.endpoint
        };
    }

    private static construction(cfg: any, req: Request) {
        return {
            label: "Construction",
            text: (cfg.KEY === "Nodesi") ? "None" : req.params.construction
        };
    }

    private static transformation(cfg: any, req: Request) {
        return {
            label: "Translator",
            text: (cfg.KEY === "Nodesi") ? "None" : req.params.transformation
        };
    }

    public viewModel: any;

    constructor(cfg: any, req: Request) {
        this.viewModel = {
            navigation: {
                items: [
                    {
                        items: [
                            new Dropdown(ViewModel.dom(cfg, req)),
                            new Dropdown(ViewModel.js(cfg, req))
                        ],
                        text: "Isolation"
                    },
                    {
                        items: [
                            new Dropdown(ViewModel.endpoint(cfg, req)),
                            new Dropdown(ViewModel.construction(cfg, req)),
                            new Dropdown(ViewModel.channel(cfg, req)),
                            new Dropdown(ViewModel.routing(cfg, req)),
                            new Dropdown(ViewModel.transformation(cfg, req))
                        ],
                        text: "Messaging"
                    }
                ]
            }
        };
    }
}
