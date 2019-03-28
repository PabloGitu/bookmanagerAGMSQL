import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'author',
                loadChildren: './author/author.module#BookmanageragmsqlAuthorModule'
            },
            {
                path: 'book',
                loadChildren: './book/book.module#BookmanageragmsqlBookModule'
            },
            {
                path: 'comment',
                loadChildren: './comment/comment.module#BookmanageragmsqlCommentModule'
            },
            {
                path: 'publisher',
                loadChildren: './publisher/publisher.module#BookmanageragmsqlPublisherModule'
            },
            {
                path: 'comment',
                loadChildren: './comment/comment.module#BookmanageragmsqlCommentModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookmanageragmsqlEntityModule {}
