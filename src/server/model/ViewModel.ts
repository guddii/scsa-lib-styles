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
                            new Dropdown({
                                items: [
                                    new DropdownItem(
                                        {
                                            text:
                                                cfg.ORCHESTRATORS.Compoxure
                                                    .options.text,
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
                                            text:
                                                cfg.ORCHESTRATORS.iFrame.options
                                                    .text,
                                            url: buildURL(
                                                req.params,
                                                { channel: "Messaging Bridge" },
                                                cfg.ORCHESTRATORS.iFrame
                                            )
                                        },
                                        cfg,
                                        req.params
                                    ),
                                    new DropdownItem(
                                        {
                                            text:
                                                cfg.ORCHESTRATORS.WebComponents
                                                    .options.text,
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
                            }),
                            new Dropdown({
                                label: "JS",
                                text: req.params.js
                                // items: [
                                //     new DropdownItem(
                                //         { route: { js: "Window" } },
                                //         cfg,
                                //         req.params
                                //     ),
                                //     new DropdownItem(
                                //         { route: { js: "Worker" } },
                                //         cfg,
                                //         req.params
                                //     )
                                // ]
                            })
                        ],
                        text: "Isolation"
                    },
                    {
                        items: [
                            new Dropdown({
                                label: "Endpoints",
                                text: req.params.endpoint
                            }),
                            new Dropdown({
                                label: "Construction",
                                text: req.params.construction
                            }),
                            new Dropdown(this.channel(cfg, req)),
                            new Dropdown({
                                label: "Routing",
                                text: req.params.routing
                                // items: [
                                //     new DropdownItem(
                                //         {
                                //             text: "Message Broker",
                                //             route: {
                                //                 channel: "None",
                                //                 routing: "Message Broker"
                                //             }
                                //         },
                                //         cfg,
                                //         req.params
                                //     )
                                // ]
                            }),
                            new Dropdown({
                                label: "Translator",
                                text: req.params.transformation
                            })
                        ],
                        text: "Messaging"
                    }
                ]
            }
        };
    }

    public channel(cfg, req) {
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
}
