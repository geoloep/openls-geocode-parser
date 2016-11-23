export interface IParsedAddress {
    Point: {
        srsName: string;
        pos: number[];
    };
    Country: string;
    Place: {
        [index: string]: string;
    };
    Concat?: string;
    PostalCode?: string;
    StreetAddress?: {
        [index: string]: string;
    };
    Depth: string;
};

export interface IOpenLSResponse {
    [index: string]: IParsedAddress[];
};

// export interface successCallback {
//     (data: openLSResponse): any;
// };

// export interface successCallback {
//     (this: void, data: openLSResponse) => void;
// }

// export interface failCallback {
//     (): any;
// }