/**
 * Created by dsmiley on 7/12/17.
 */
export interface IExporter {
    export(object: Object): string;
    canExport(object: Object): boolean;
}
