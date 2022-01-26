import { TvDetailComponent } from './tv-detail/tv-detail.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent
  },
  {
    path: 'tv/:id',
    component: TvDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
