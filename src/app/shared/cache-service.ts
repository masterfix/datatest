import { Router, RoutesRecognized } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/do';

@Injectable()
export class CacheService {

    private cache: Map<String, Observable<any>> = new Map();

    constructor(router: Router) {
        router.events.subscribe(event => {
            // console.log("router event:", event);
            if (event instanceof RoutesRecognized) {
                // console.log("detected page change! resetting service cache");
                this.clear();
            }
        });
    }

    public cacheable<T>(returnObservable: () => Observable<T>, key?: string): Observable<T> {
        if (!!key && this.cache.has(key)) {
            console.log("returning observable from cache with key", key);
            return this.cache.get(key) as Observable<T>;
        }
        console.log("creating a new observable...");
        const observable = Observable.defer(() => returnObservable().do(() => {
            console.log("executing low level observable...");
        })).publishReplay(1).refCount();
        if (!!key) {
            console.log("put observable into cache with key", key);
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
