import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAuthor } from 'app/shared/model/author.model';

type EntityResponseType = HttpResponse<IAuthor>;
type EntityArrayResponseType = HttpResponse<IAuthor[]>;

@Injectable({ providedIn: 'root' })
export class AuthorService {
    public resourceUrl = SERVER_API_URL + 'api/authors';

    constructor(protected http: HttpClient) {}

    create(author: IAuthor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(author);
        return this.http
            .post<IAuthor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(author: IAuthor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(author);
        return this.http
            .put<IAuthor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAuthor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAuthor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(author: IAuthor): IAuthor {
        const copy: IAuthor = Object.assign({}, author, {
            birthdate: author.birthdate != null && author.birthdate.isValid() ? author.birthdate.format(DATE_FORMAT) : null,
            deathDate: author.deathDate != null && author.deathDate.isValid() ? author.deathDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.birthdate = res.body.birthdate != null ? moment(res.body.birthdate) : null;
            res.body.deathDate = res.body.deathDate != null ? moment(res.body.deathDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((author: IAuthor) => {
                author.birthdate = author.birthdate != null ? moment(author.birthdate) : null;
                author.deathDate = author.deathDate != null ? moment(author.deathDate) : null;
            });
        }
        return res;
    }
}
