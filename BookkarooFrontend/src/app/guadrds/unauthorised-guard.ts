import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const unauthorisedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const status = localStorage.getItem('status');

  if (status === 'loggedin') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
