import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanDeactivateGaurd } from './can-deactivate-gaurd.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit,OnDestroy ,CanDeactivateGaurd{
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;
  id ;
  paramSubscription:Subscription ;
  queryParamSubscription:Subscription;

  constructor(private serversService: ServersService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams)
    console.log(this.route.snapshot.fragment)
   this.queryParamSubscription = this.route.queryParams.subscribe(
      (queryParams:Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false
      }
    );
   this.paramSubscription = this.route.params.subscribe(
      (params:Params) => {
        this.id  = +params['id'];
      }
    )
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(this.id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  canDeactivate():Observable<boolean> | Promise<boolean> |boolean{
    if(!this.allowEdit){
      return true
    }
    if(this.serverName !==this.server.name || this.serverStatus !== this.server.status && !this.changesSaved){
      return confirm('do you want to discard the changes')
    } else{
      return true;
    }

  }

  ngOnDestroy(){
    this.paramSubscription.unsubscribe();
    this.queryParamSubscription.unsubscribe();
  }

}
