import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './pages/page.component';
import { HistoryComponent } from './pages/history/history.component';
import { GamesComponent } from './pages/games/games.component';
import { ActivitiesPageComponent } from './pages/activities/activities-page.component';
import { LaserLogComponent } from './pages/laser-log/laser-log.component';
import { LaserGamesComponent } from './pages/laser-games/laser-games.component';
import { GeocachingComponent } from './pages/geocaching/geocaching.component';
import { SteamComponent } from './pages/steam/steam.component';
import { MinecraftComponent } from './pages/minecraft/minecraft.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'activities', component: ActivitiesPageComponent },
  { path: 'laser-tag', component: LaserLogComponent },
  { path: 'laser-games', component: LaserGamesComponent },
  { path: 'activities/geocaching', component: GeocachingComponent },
  { path: 'games/steam', component: SteamComponent },
  { path: 'games/minecraft', component: MinecraftComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'page/:slug', component: PageComponent },
  { path: '**', redirectTo: '' },
];
