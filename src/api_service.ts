import rp from "request-promise-native";

export class ApiService {
    private _uri: string;
    private _method_type: MethodType;
    private _headers: Map<string, string>;
    private _body: Map<string, string>;

    constructor () {
        this._headers = new Map<string, string>();
    }

    public reset() {
        this._uri = "";
        this._headers = new Map<string, string>();
    }

    public uri(uri: string): ApiService {
        this._uri = uri;
        return this;
    }

    public method(method_type: MethodType): ApiService {
        this._method_type = method_type;
        return this;
    }

    public body(body: KeyPair<string, string>[]): ApiService {
        for (let b of body) {
            this._body.set(b.key, b.value);
        }

        return this;
    }

    public header(headers: KeyPair<string, string>[]): ApiService {
        for (let header of headers) {
            this._headers.set(header.key, header.value);
        }

        return this;
    }

    public async send<T>(): Promise<ApiResponse<T>> {
        let option = this.make_option();

        try {
            const result: T = await rp(option);
            return {result: "Success", error: null, response: result};
        } catch(err) {
            return {result: "Fail", error: null, response: null};
        }
    }

    private make_option(): rp.Options {
        const request_headers: any = {};
        for (const header of this._headers) {
            request_headers[header[0]] = header[1];
        }

        if (this._method_type === "GET") {
            return {
                url: this._uri,
                headers: request_headers,
                json: true
            };
        } else if (this._method_type === "POST") {
            return {
                url: this._uri,
                headers: request_headers,
                json: true
            };
        }
    }
}

export type MethodType = "GET" | "POST";

export type KeyPair<K, V> = {
    key: K;
    value: V;
}

export type ApiResult = "Success" | "Fail";

export type ApiError = {
    error_code: string;
    description: string;
}

export type ApiResponse<T> = {
    result: ApiResult;
    error: ApiError;
    response: T;
}