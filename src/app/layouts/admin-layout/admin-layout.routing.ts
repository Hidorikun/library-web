import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {TableComponent} from '../../pages/table/table.component';
import {TypographyComponent} from '../../pages/typography/typography.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {NotificationsComponent} from '../../pages/notifications/notifications.component';
import {UpgradeComponent} from '../../pages/upgrade/upgrade.component';
import {BooksComponent} from '../../pages/books/books.component';
import {CustomerListComponent} from '../../pages/customer/customer-list.component';
import {CustomerDetailsComponent} from '../../pages/customer/customer-details/customer-details.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'books', component: BooksComponent},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'customers',
    component: CustomerListComponent,
  },
  {
    path: 'customer/:customerId',
    component: CustomerDetailsComponent
  },
  {path: 'table', component: TableComponent},
  {path: 'typography', component: TypographyComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'upgrade', component: UpgradeComponent}
];
