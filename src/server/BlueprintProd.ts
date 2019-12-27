import cors from "cors";
import express, { Request, Response } from "express";
import nodesi from "nodesi";
import path from "path";
import { Manifest } from "./api/resources/Manifest";
import { ViewModel } from "./model/ViewModel";
import { Parser } from "./utils/Parser";

const STATIC_DIR = "src/server/static/";
const MODULE_DIR = "node_modules/@scsa/styling/";

const SHARED_STATIC = path.resolve(MODULE_DIR, STATIC_DIR);
const LOCAL_STATIC = path.resolve(STATIC_DIR);
const LOCAL_ASSETS = path.resolve("dist/client/");

const API = path.resolve("dist/api/");

interface IBlueprintOptions {
    dev: boolean;
    name: string;
    short_name: string;
}

interface IViewOptions {
    name: string;
    route: string;
    view: string;
    description?: string;
}

class BlueprintProd {
    public readonly app: express.Application;
    protected options: IBlueprintOptions;
    protected cfg: any;

    /**
     * Constructor
     *
     * @param cfg
     * @param options This will available within the templates
     */
    constructor(cfg: any, options?: IBlueprintOptions) {
        this.app = express();
        this.cfg = cfg;
        this.options = options || {
            dev: false,
            name: "Application",
            short_name: "App"
        };
        return this;
    }

    /**
     * Apply settings
     */
    public settings() {
        this.app.set("views", path.resolve("src/server/views"));
        this.app.set("view engine", "pug");
        this.app.use(cors());
    }

    /**
     * Enables Edge Side Includes
     */
    public esi() {
        this.app.use(nodesi.middleware());
        return this;
    }

    /**
     * Apply assets
     */
    public assets() {
        this.app.use("/assets", express.static(LOCAL_ASSETS));
        this.app.use("/api", express.static(API));
    }

    /**
     * Apply static
     */
    public static() {
        this.app.use(express.static(LOCAL_STATIC));
        this.app.use(express.static(SHARED_STATIC));
    }

    /**
     * Generate data
     *
     * @param options View options
     * @param req Request object
     */
    public data(options: IViewOptions, req: Request) {
        req.params = Parser.params(req.params);
        return {
            ...this.cfg,
            ...this.options,
            ...options,
            ...new ViewModel(this.cfg, req),
            req: { params: req.params }
        };
    }

    /**
     * Creates a view and a corresponding view model
     *
     * @param options View options
     */
    public view(options: IViewOptions) {
        // View as JSON
        this.app.get(options.route + ".json", (req: Request, res: Response) => {
            res.type("json");
            res.send(this.data(options, req));
        });
        // View as HTML
        this.app.get(options.route, (req: Request, res: Response) => {
            res.type("html");
            res.render(options.view, this.data(options, req));
        });
    }

    /**
     * Apply all default mounts & settings
     */
    public mounts() {
        this.settings();
        this.app.get("/manifest.json", (req: Request, res: Response) => {
            res.type("json");
            res.send(new Manifest(this.options).get());
        });
        this.assets();
        this.static();
        this.view({
            description: "Application",
            name: "App",
            route: "/",
            view: "index"
        });
        this.view({
            description: "Application",
            name: "App",
            route: "/api/fragments/:type?",
            view: "fragment"
        });
        this.view({
            description: "Application",
            name: "App",
            route:
                "/Messaging/:js?/:endpoint?/:construction?/:channel?/:routing?/:transformation?",
            view: "index"
        });
        return this;
    }

    /**
     * Apply listener to application
     *
     * @param handle
     * @param listeningListener
     */
    public listen(
        handle = process.env.PORT || 3000,
        listeningListener = () => {
            console.log("Server running on http://localhost:" + handle);
        }
    ) {
        this.app.listen(handle, listeningListener);
    }
}

export { BlueprintProd as Blueprint };
