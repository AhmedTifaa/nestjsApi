import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from './store.model';

@Injectable()
export class StoreService{
    private stores:Store[] = [
        new Store(1,'first store'),
        new Store(2,'first store'),
        new Store(3,'first store'),
        new Store(4,'first store'),
    ];
    getStores(){
        return this.stores;
    }
}