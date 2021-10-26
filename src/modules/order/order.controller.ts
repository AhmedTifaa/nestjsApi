import { Body, Controller,Get,Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { orderBody } from './orderSwagger.model';

@Controller('order')
export class OrderController {
    constructor(private orderService:OrderService){}
    @Post()
    @ApiBody({description:"created successfully",type:orderBody})
    @ApiResponse({ status: 200, description: 'created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request Data ( invalid post data )' })
    @ApiResponse({ status: 404, description: 'customer not found' })
    createOrder(
        @Body('storeId') storeId:number, 
        @Body('customerId') customerId:string, 
        @Body('customerDeliveryAddressId') customerDeliveryAddressId:string, 
        @Body('items') items:object[], 
    ):{id:string}{
       var orderId = this.orderService.createOrder(storeId,customerId,customerDeliveryAddressId,items);
        return {id:orderId};
    }
    @Get()
    @ApiResponse({ status: 200, description: 'listed orders successfully' })
    listOrders():object{
       var orders = this.orderService.listOrders();
        return orders;
    }
}
