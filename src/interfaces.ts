export interface parsedAddress {
    Point: {
        srsName: string;
        pos: number[];
    };
    Country: string;
    Place: {
        [index: string]: string;
    }
    Concat?: string;
    PostalCode?: string;
    StreetAddress?: {
        [index: string]: string;
    };
    Depth: string;
};

export interface openLSResponse {
    [index: string]: parsedAddress[];
};

export interface successCallback {
    (data: openLSResponse): any;
};

export interface failCallback {
    (): any;
}