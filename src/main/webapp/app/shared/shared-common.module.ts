import { NgModule } from '@angular/core';

import { BookmanageragmsqlSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [BookmanageragmsqlSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [BookmanageragmsqlSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BookmanageragmsqlSharedCommonModule {}
