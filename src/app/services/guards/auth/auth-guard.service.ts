import { WebsocketConnectionService } from 'src/app/services/websocket/websocket-connection.service';
import { Session } from 'src/app/models/utils/session/session';
import { GenericWs } from 'src/app/models/entity/generics/websocket/generic-ws';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment, UrlTree, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(
    private router: Router
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

  public canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(AuthGuardService.checkAuthState()) {
      return true;
    }
    this.router.navigateByUrl('login');
  }

  public static checkAuthState(): boolean {
    if(!Session.getSessionItem('token')) {
      return false;
    }
    return true;
  }
}
