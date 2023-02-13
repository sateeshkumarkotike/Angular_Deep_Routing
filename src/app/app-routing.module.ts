import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from './auth-gaurd.service';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGaurd } from './servers/edit-server/can-deactivate-gaurd.service';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes:Routes = [
    { path:'' ,component:HomeComponent },
    { path:'users' ,component:UsersComponent,children:[
      { path:':id/:name' ,component:UserComponent },
    ] },
  
    { path:'servers' ,
    // canActivate:[AuthGaurd] ,
    canActivateChild:[AuthGaurd],
    component:ServersComponent,children:[
      { path:':id',component:ServerComponent },
    { path:':id/edit',component:EditServerComponent,canDeactivate:[CanDeactivateGaurd]}
    ] },
    { path:'**' ,component:PageNotFoundComponent }
  ]

@NgModule({
  imports:[
      RouterModule.forRoot(appRoutes,{useHash:true})
  ],
  exports:[RouterModule]
})
export class AppRoutingModule{

}