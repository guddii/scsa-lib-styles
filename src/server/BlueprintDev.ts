import * as base from "@scsa/base";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { Blueprint } from "./BlueprintProd";

const config: webpack.Configuration = base.moduleBundler.client.dev() as unknown;
const compiler: webpack.Compiler = webpack(config);

class BlueprintDev extends Blueprint {
    /**
     * Constructor
     */
    constructor(cfg: any) {
        super(cfg);
        this.hmr();
    }
    /**
     * Attach the dev middleware to the compiler & the server
     */
    dev() {
        this.app.use(
            webpackDevMiddleware(compiler, {
                logLevel: "warn",
                publicPath: config.output.publicPath
            })
        );

        return this;
    }

    /**
     * Attach the hot middleware to the compiler & the server
     */
    hot() {
        this.app.use(
            webpackHotMiddleware(compiler, {
                log: console.log,
                path: "/__webpack_hmr"
            })
        );

        return this;
    }

    /**
     * Apply HMR mounts to application
     */
    hmr() {
        this.options = { ...this.options, ...{ dev: true } };
        this.dev();
        this.hot();

        return this;
    }
}

export { BlueprintDev as Blueprint };
