import { Request } from "express";
import { Dropdown, DropdownItem } from "./view/Dropdown";

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
                                            url: new URL(
                                                req.path,
                                                cfg.ORCHESTRATORS.Compoxure.options.url
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
                                            url: new URL(
                                                req.path,
                                                cfg.ORCHESTRATORS.iFrame.options.url
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
                                            url: new URL(
                                                req.path,
                                                cfg.ORCHESTRATORS.WebComponents.options.url
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
                                text: "Event-driven Consumer"
                            }),
                            new Dropdown({
                                label: "Construction",
                                text: "Event Message"
                            }),
                            new Dropdown({
                                items: [
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
                                ],
                                label: "Channel",
                                text: req.params.channel
                            }),
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
                                text: "None"
                            })
                        ],
                        text: "Messaging"
                    }
                ]
            }
        };
    }
}
