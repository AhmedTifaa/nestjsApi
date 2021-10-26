import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/customer/customer.module';
import { ItemsModule } from './modules/items/items.module';
import { OrderModule } from './modules/order/order.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    CustomerModule,
    OrderModule,
    StoreModule,
    ItemsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
