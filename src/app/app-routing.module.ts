import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './unAuth/sign-up/sign-up.component';
import { SignInComponent } from './unAuth/sign-in/sign-in.component';
import { TabsPage } from './tabs/tabs.page';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { ProductsComponent } from './auth/products/products.component';
import { ReportsComponent } from './auth/reports/reports.component';
import { MessageComponent } from './auth/message/message.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { ChatComponent } from './auth/chat/chat.component';
import { EditContactDetailsComponent } from './auth/edit-contact-details/edit-contact-details.component';
import { EditOperationHoursComponent } from './auth/edit-operation-hours/edit-operation-hours.component';
import { EditStoreAddressComponent } from './auth/edit-store-address/edit-store-address.component';
import { PrintReportComponent } from './auth/print-report/print-report.component';
import { ProductDetailsComponent } from './auth/product-details/product-details.component';
const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'sign-up',
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'sign-in', component: SignInComponent
  },
  {
    path: 'tabs', component: TabsPage
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'message', component: MessageComponent
  },
  {
    path: 'report', component: ReportsComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'edit-contacts', component: EditContactDetailsComponent
  },
  {
    path: 'edit-operations', component: EditOperationHoursComponent
  },
  {
    path: 'edit-address', component: EditStoreAddressComponent
  },
  {
    path: 'print-report', component: PrintReportComponent
  },
  {
    path: 'chat/:id', component: ChatComponent
  },
  {
    path: 'productDetails/:id', component: ProductDetailsComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
