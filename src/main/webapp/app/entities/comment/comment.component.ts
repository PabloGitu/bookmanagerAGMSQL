import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IComment } from 'app/shared/model/comment.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { CommentService } from './comment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'jhi-comment',
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit, OnDestroy {
    comments: IComment[];
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
        protected commentService: CommentService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected parseLinks: JhiParseLinks,
        protected accountService: AccountService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        this.comments = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll(id, url) {
        if (url.includes('book')) {
            this.commentService
                .findByBook(id, {
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IComment[]>) => this.paginateComments(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        } else {
            this.commentService
                .query({
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IComment[]>) => this.paginateComments(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }

    reset() {
        this.page = 0;
        this.comments = [];
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
        this.registerChangeInComments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IComment) {
        return item.id;
    }

    registerChangeInComments() {
        this.eventSubscriber = this.eventManager.subscribe('commentListModification', response => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateComments(data: IComment[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        for (let i = 0; i < data.length; i++) {
            this.comments.push(data[i]);
        }
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
