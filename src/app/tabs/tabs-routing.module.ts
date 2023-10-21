import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { DashboardComponent } from '../auth/dashboard/dashboard.component';
import { ProductsComponent } from '../auth/products/products.component';
import { ReportsComponent } from '../auth/reports/reports.component';
import { MessageComponent } from '../auth/message/message.component';
import { ProfileComponent } from '../auth/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
          path: 'dashboard',
          children: [
              {
                  path: '',
                 component: DashboardComponent
              }
          ]
      },
      {
          path: 'products',
          children: [
              {
                  path: '',
                 component: ProductsComponent
              }
          ]
      },
      {
          path: 'report',
          children: [
              {
                  path: '',
                 component: ReportsComponent
              }
          ]
      },
      {
          path: 'message',
          children: [
              {
                  path: '',
                 component: MessageComponent
              }
          ]
      },
      {
          path: 'profile',
          children: [
              {
                  path: '',
                 component: ProfileComponent
              }
          ]
      },
      // {
      //     path: 'landing',
      //     children: [
      //         {
      //             path: '',
      //            component: LandingComponent
      //         }
      //     ]
      // },
      {
          path:'',
          redirectTo:'dashboard',
          pathMatch: 'full'
      }

      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
