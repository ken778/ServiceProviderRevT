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
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { AddProductComponent } from './auth/add-product/add-product.component';
import { OrderComponent } from './auth/order/order/order.component';
import { PrepareOrderComponent } from './auth/prepareOrder/prepare-order/prepare-order.component';
import { HistoryComponent } from './auth/history/history.component';
import { OrderDetailsComponent } from './auth/order-details/order-details.component';
import { ForgotPasswordComponent } from './unAuth/forgot-password/forgot-password/forgot-password.component';
const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'sign-in',
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
    path: 'edit-profile', component: EditProfileComponent
  },
  {
    path: 'productDetails/:id', component: ProductDetailsComponent
  },
  {
    path: 'order/:id', component: OrderComponent
  },
  {
    path: 'prepare-order/:id', component: PrepareOrderComponent
  },
  {
    path: 'order-details/:id', component: OrderDetailsComponent
  },
  {
    path: 'add-product', component: AddProductComponent
  },
  {
    path: 'history', component: HistoryComponent
  },
  {
    path: 'recover', component: ForgotPasswordComponent
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
