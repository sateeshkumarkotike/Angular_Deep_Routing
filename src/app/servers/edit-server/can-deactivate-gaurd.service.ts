import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


export class CanComponentDeactivate{
    canDeactivate:() => Observable<boolean> | Promise<boolean> |boolean
}

export class CanDeactivateGaurd implements CanDeactivate<CanComponentDeactivate>{
    canDeactivate(component:CanComponentDeactivate,currentState:ActivatedRouteSnapshot,nextState?:RouterStateSnapshot):Observable<boolean> | Promise<boolean> |boolean{
      return component.canDeactivate();
    }
}