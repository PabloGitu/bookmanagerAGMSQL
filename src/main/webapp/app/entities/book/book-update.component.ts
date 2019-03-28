import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from './book.service';
import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from 'app/entities/author';
import { IPublisher } from 'app/shared/model/publisher.model';
import { PublisherService } from 'app/entities/publisher';

@Component({
    selector: 'jhi-book-update',
    templateUrl: './book-update.component.html'
})
export class BookUpdateComponent implements OnInit {
    book: IBook;
    isSaving: boolean;

    authors: IAuthor[];

    publishers: IPublisher[];
    publicationDateDp: any;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected bookService: BookService,
        protected authorService: AuthorService,
        protected publisherService: PublisherService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ book }) => {
            this.book = book;
        });
        this.authorService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAuthor[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAuthor[]>) => response.body)
            )
            .subscribe((res: IAuthor[]) => (this.authors = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.publisherService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPublisher[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPublisher[]>) => response.body)
            )
            .subscribe((res: IPublisher[]) => (this.publishers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.book, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.book.id !== undefined) {
            this.subscribeToSaveResponse(this.bookService.update(this.book));
        } else {
            this.subscribeToSaveResponse(this.bookService.create(this.book));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBook>>) {
        result.subscribe((res: HttpResponse<IBook>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAuthorById(index: number, item: IAuthor) {
        return item.id;
    }

    trackPublisherById(index: number, item: IPublisher) {
        return item.id;
    }
}
