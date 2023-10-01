import { Container, ContainerModule } from "inversify";
import { App } from "./app";
export interface IBootstrapRun {
    appContainer: Container;
    app: App;
}
export declare const appBindings: ContainerModule;
export declare const appContainer: Container, app: App;
