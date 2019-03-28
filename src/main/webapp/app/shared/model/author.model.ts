import { Moment } from 'moment';
import { IBook } from 'app/shared/model/book.model';

export const enum Genre {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export interface IAuthor {
    id?: number;
    name?: string;
    genre?: Genre;
    birthdate?: Moment;
    deathDate?: Moment;
    country?: string;
    imageContentType?: string;
    image?: any;
    books?: IBook[];
}

export class Author implements IAuthor {
    constructor(
        public id?: number,
        public name?: string,
        public genre?: Genre,
        public birthdate?: Moment,
        public deathDate?: Moment,
        public country?: string,
        public imageContentType?: string,
        public image?: any,
        public books?: IBook[]
    ) {}
}
