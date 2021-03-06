import { Session } from 'src/app/models/utils/session/session';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment, UrlTree, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(
    private router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

  public canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (AuthGuardService.checkAuthState()) {
      this.menuAccessValidate();
      return true;
    }
    this.router.navigateByUrl('login');
  }

  public static checkAuthState(): boolean {
    if (!Session.getSessionItem('token')) {
      return false;
    }
    return true;
  }

  public menuAccessValidate() {
    if (Session.getSessionItem('user') && Session.getSessionItem('user').tipo == 'USU') {
      if (document.getElementById('task-list')) {
        document.getElementById('task-list').remove();
      }
    } else {
      if (document.getElementById('my-tasks')) {
        document.getElementById('my-tasks').remove();
      }
    }
  }

}
