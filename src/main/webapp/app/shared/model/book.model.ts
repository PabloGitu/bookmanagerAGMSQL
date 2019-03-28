import { Moment } from 'moment';
import { IComment } from 'app/shared/model/comment.model';
import { IAuthor } from 'app/shared/model/author.model';
import { IPublisher } from 'app/shared/model/publisher.model';

export const enum BookCover {
    SOFT = 'SOFT',
    HARD = 'HARD'
}

export const enum BookGenre {
    THRILLER = 'THRILLER',
    ROMANTIC = 'ROMANTIC',
    ADVENTURE = 'ADVENTURE',
    SCARY = 'SCARY',
    SCIENCEFICTION = 'SCIENCEFICTION',
    CHILD = 'CHILD',
    POLICY = 'POLICY',
    SOCIETY = 'SOCIETY',
    OTHER = 'OTHER'
}

export interface IBook {
    id?: number;
    title?: string;
    description?: string;
    publicationDate?: Moment;
    price?: number;
    bookCover?: BookCover;
    genre?: BookGenre;
    isBestSeller?: boolean;
    imageContentType?: string;
    image?: any;
    comments?: IComment[];
    author?: IAuthor;
    publisher?: IPublisher;
}

export class Book implements IBook {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public publicationDate?: Moment,
        public price?: number,
        public bookCover?: BookCover,
        public genre?: BookGenre,
        public isBestSeller?: boolean,
        public imageContentType?: string,
        public image?: any,
        public comments?: IComment[],
        public author?: IAuthor,
        public publisher?: IPublisher
    ) {
        this.isBestSeller = this.isBestSeller || false;
    }
}
