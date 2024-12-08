import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  delay,
  dematerialize,
  materialize,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        // case url.endsWith('/users/register') && method === 'POST':
        //     return register();
        // case url.endsWith('/users') && method === 'GET':
        //     return getUsers();
        // case url.match(/\/users\/\d+$/) && method === 'DELETE':
        //     return deleteUser();
        default:
          return next.handle(request);
      }
    }

    function authenticate() {
      const { username, password } = body;
      const user =
        username === 'user@yourdomain.com' && password === 'password@1234';
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: '1L',
        username: 'John Doe',
        firstName: 'John',
        lastName: 'Doe',
        token: 'fake-jwt-token',
        email: 'user@yourdomain.com',
      });
    }

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: any) {
      return throwError({ error: { message } });
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
