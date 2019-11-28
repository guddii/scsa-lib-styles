import { scsa } from "@scsa/base";

const convert = (map: any) =>
    Array.from(map).reduce((obj, [key, value]) => {
        // @ts-ignore
        obj[key] = value;
        return obj;
    }, {});

export class Config {
    MODE: string;
    ORCHESTRATOR: scsa.Orchestrator;
    ORCHESTRATORS: any;
    APPLICATIONS: any;
    NODE_ENV: string;
    PORT: string;

    constructor(current: string) {
        this.MODE = process.env.MODE || "dev";
        // @ts-ignore
        const ConfigByMode: any = scsa[this.MODE].options;
        this.ORCHESTRATORS = convert(ConfigByMode.orchestrators);
        this.APPLICATIONS = convert(ConfigByMode.applications);
        this.ORCHESTRATOR = ConfigByMode.orchestrators.get(current);
        this.NODE_ENV = process.env.NODE_ENV || "development";
        this.PORT = process.env.PORT || this.ORCHESTRATOR.options.href.port;
    }
}
