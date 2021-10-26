import { Module } from '@nestjs/common';
import { customerService } from '../customer/customer.service';
import { ItemsService } from '../items/items.service';
import { StoreService } from '../store/store.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    controllers: [OrderController],
    providers: 
    [
      OrderService,
      StoreService,
      customerService,
      ItemsService
    ],
})
export class OrderModule {}