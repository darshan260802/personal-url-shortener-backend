import { Request } from "express";
// Custom Request Model - So we can give type of body
export interface CustomRequest<T> extends Request{
    body: T
}
