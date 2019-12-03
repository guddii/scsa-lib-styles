import express, { Request, Response } from "express";
import path from "path";
import { Manifest } from "./api/resources/Manifest";
import { ViewModel } from "./model/ViewModel";

const STATIC_DIR = "src/server/static/";
const MODULE_DIR = "node_modules/@scsa/styling/";

const SHARED_STATIC = path.resolve(MODULE_DIR, STATIC_DIR);
const LOCAL_STATIC = path.resolve(STATIC_DIR);
const LOCAL_ASSETS = path.resolve("dist/client/");

interface BlueprintOptions {
    dev: boolean;
    name: string;
    short_name: string;
}

interface ViewOptions {
    name: string;
    route: string;
    view: string;
    description?: string;
}

class BlueprintProd {
    readonly app: express.Application;
    protected options: BlueprintOptions;
    protected cfg: any;

    /**
     * Constructor
     *
     * @param cfg
     * @param options This will available within the templates
     */
    constructor(cfg: any, options?: BlueprintOptions) {
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
    settings() {
        this.app.set("views", path.resolve("src/server/views"));
        this.app.set("view engine", "pug");
    }

    /**
     * Apply assets
     */
    assets() {
        this.app.use("/assets", express.static(LOCAL_ASSETS));
    }

    /**
     * Apply static
     */
    static() {
        this.app.use(express.static(LOCAL_STATIC));
        this.app.use(express.static(SHARED_STATIC));
    }

    /**
     * Generate data
     *
     * @param options View options
     * @param req Request object
     */
    data(options: ViewOptions, req: Request) {
        return {
            ...this.cfg,
            ...this.options,
            ...options,
            ...new ViewModel(this.cfg, req.params)
        };
    }

    /**
     * Creates a view and a corresponding view model
     *
     * @param options View options
     */
    view(options: ViewOptions) {
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
    mounts() {
        this.settings();
        this.assets();
        this.static();
        this.view({
            route:
                "/:js?/:endpoint?/:construction?/:channel?/:routing?/:transformation?",
            view: "index",
            name: "App",
            description: "Application"
        });
        this.app.get("/manifest.json", (req: Request, res: Response) => {
            res.type("json");
            res.send(new Manifest(this.options));
        });
        return this;
    }

    /**
     * Apply listener to application
     *
     * @param handle
     * @param listeningListener
     */
    listen(
        handle = process.env.PORT || 3000,
        listeningListener = () => {
            console.log("Server running on http://localhost:" + handle);
        }
    ) {
        this.app.listen(handle, listeningListener);
    }
}

export { BlueprintProd as Blueprint };
