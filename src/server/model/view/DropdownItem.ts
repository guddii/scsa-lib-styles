import { Application } from "@scsa/global";
// tslint:disable-next-line:no-implicit-dependencies
import { ParamsDictionary } from "express-serve-static-core";
import { IRoute } from "./IRoute";


export function buildURL(params: ParamsDictionary, overwrite: IRoute, app: Application) {
  const mergedRoute = {
    ...params,
    ...overwrite
  };
  return new URL(
    // Replace with parameter
    app.options.url.href + "Messaging/" +
    Object.values(mergedRoute)
      .map(i => encodeURIComponent(i))
      .join("/")
  );
}

interface IDropdownItemOptions {
  text?: string;
  url?: URL;
  route?: IRoute;
  dom?: string;
}

export class DropdownItem extends Application {

  constructor(options: IDropdownItemOptions,  cfg: any, params?: ParamsDictionary, ) {
    super({
      text: options.text || Object.values(options.route).join(),
      url: options.url || buildURL(params, options.route, cfg.CURRENT)
    });
  }

}
