import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsListComponent } from './projects/projects-list.component';
import { PageComponent } from './pages/page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsListComponent },
  { path: 'pages/:slug', component: PageComponent },
  { path: '**', redirectTo: '' },
];
