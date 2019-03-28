import { IUser } from 'app/core/user/user.model';
import { IBook } from 'app/shared/model/book.model';

export interface IComment {
    id?: number;
    description?: string;
    user?: IUser;
    book?: IBook;
}

export class Comment implements IComment {
    constructor(public id?: number, public description?: string, public user?: IUser, public book?: IBook) {}
}
