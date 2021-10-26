import { Injectable, NotFoundException } from '@nestjs/common';
import { Items } from './items.model';

@Injectable()
export class ItemsService{
    private items:Items[] = [
        new Items(1,'product one',10),
        new Items(2,'product two',2.5),
        new Items(3,'product three',3),
        new Items(4,'product four',5),
    ];
    getitems(){
        return this.items;
    }
}