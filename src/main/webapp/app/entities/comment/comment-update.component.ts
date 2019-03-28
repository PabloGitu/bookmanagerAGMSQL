import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IComment } from 'app/shared/model/comment.model';
import { CommentService } from './comment.service';
import { IUser, UserService } from 'app/core';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book';

@Component({
    selector: 'jhi-comment-update',
    templateUrl: './comment-update.component.html'
})
export class CommentUpdateComponent implements OnInit {
    comment: IComment;
    isSaving: boolean;

    users: IUser[];

    books: IBook[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected commentService: CommentService,
        protected userService: UserService,
        protected bookService: BookService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ comment }) => {
            this.comment = comment;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.bookService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBook[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBook[]>) => response.body)
            )
            .subscribe((res: IBook[]) => (this.books = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(this.commentService.create(this.comment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IComment>>) {
        result.subscribe((res: HttpResponse<IComment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackBookById(index: number, item: IBook) {
        return item.id;
    }
}
