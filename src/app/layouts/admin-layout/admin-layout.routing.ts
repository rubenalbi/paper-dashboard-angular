import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AuthGuard } from 'app/shared/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'user', component: UserComponent },
            { path: 'table', component: TableComponent },
            { path: 'typography', component: TypographyComponent },
            { path: 'icons', component: IconsComponent },
            { path: 'notifications', component: NotificationsComponent },
            { path: 'upgrade', component: UpgradeComponent },
        ]
    }
];
