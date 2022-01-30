import { DataObject } from "./DataObject";
import { Property } from "./Property";

export const enum Method {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

// export const enum Method {
//     GET,
//     POST,
//     PATCH,
//     DELETE
// }

export interface Endpoint{
    Id: any,
    Name: string,
    URI: string,
    APIKey: string,
    DataObject: DataObject
    Method: Method
}