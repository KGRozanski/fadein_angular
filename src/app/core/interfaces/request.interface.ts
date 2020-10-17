export interface Req {
    method: string;
    action: string;
    credentials: boolean;
    requestData: object;
}