import { DataObject } from "./DataObject";
import { Property } from "./Property";

export const enum Method {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export interface Endpoint{
    Id: any,
    URI: string,
    APIKey: string,
    DataObject: DataObject
    Method: Method
}