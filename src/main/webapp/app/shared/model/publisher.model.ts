import { IBook } from 'app/shared/model/book.model';

export const enum Distribution {
    WORLDWIDE = 'WORLDWIDE',
    REGIONAL = 'REGIONAL'
}

export interface IPublisher {
    id?: number;
    name?: string;
    distribution?: Distribution;
    localization?: string;
    books?: IBook[];
}

export class Publisher implements IPublisher {
    constructor(
        public id?: number,
        public name?: string,
        public distribution?: Distribution,
        public localization?: string,
        public books?: IBook[]
    ) {}
}
