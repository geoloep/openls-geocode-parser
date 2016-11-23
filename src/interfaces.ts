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