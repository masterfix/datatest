import { Router, RoutesRecognized } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class CacheService {

    private cache: Map<String, Observable<any>> = new Map();

    constructor(router: Router) {
        router.events.subscribe(event => {
            //console.log("router event:", event);
            if (event instanceof RoutesRecognized) {
                //console.log("detected page change! resetting service cache");
                this.clear();
            }
        });
    }

    public cacheable<T>(returnObservable: () => Observable<T>, key?: string): Observable<T> {
        if (!!key && this.cache.has(key)) {
            return this.cache.get(key) as Observable<T>;
        }
        let replay = new ReplaySubject<T>(1);
        returnObservable().subscribe(
            x => replay.next(x),
            x => replay.error(x),
            () => replay.complete()
        );
        let observable = replay.asObservable();
        if (!!key) {
            this.cache.set(key, observable);
        }
        return observable;
    }

    public clear() {
        let size = this.cache.size;
        this.cache.clear();
        console.log("cache cleared! (removed", size, "observables)");
    }

}