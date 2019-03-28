import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IBook } from 'app/shared/model/book.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { BookService } from './book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'jhi-book',
    templateUrl: './book.component.html'
})
export class BookComponent implements OnInit, OnDestroy {
    books: IBook[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    reverse: any;
    totalItems: number;
    public id: string;
    public url: string;

    constructor(
        protected bookService: BookService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected parseLinks: JhiParseLinks,
        protected accountService: AccountService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        this.books = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll(id, url) {
        if (url.includes('author')) {
            this.bookService
                .findByAuthor(id, {
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IBook[]>) => this.paginateBooks(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        } else if (url.includes('publisher')) {
            this.bookService
                .findByPublisher(id, {
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IBook[]>) => this.paginateBooks(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        } else {
            this.bookService
                .query({
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IBook[]>) => this.paginateBooks(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }

    reset() {
        this.page = 0;
        this.books = [];
        this.loadAll(this.id, this.url);
    }

    loadPage(page) {
        this.page = page;
        this.loadAll(this.id, this.url);
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.url = this.router.url;
        this.loadAll(this.id, this.url);
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBooks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBook) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInBooks() {
        this.eventSubscriber = this.eventManager.subscribe('bookListModification', response => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateBooks(data: IBook[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        for (let i = 0; i < data.length; i++) {
            this.books.push(data[i]);
        }
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
