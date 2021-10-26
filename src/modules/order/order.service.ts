import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { Validator } from 'src/helpers/validator';
import { customerService } from '../customer/customer.service';
import { ItemsService } from '../items/items.service';
import { StoreService } from '../store/store.service';
import { Order } from './order.model';
import { Items } from '../items/items.model'
let ordersData:Order[] = [];
@Injectable()
export class OrderService{
    private orders:Order[] = ordersData;
    constructor(private storeService:StoreService,private customerService:customerService,private itemsService:ItemsService){}
    
    createOrder(storeId:number,customerId:string,customerDeliveryAddressId:string,items:object[]){
        new Validator().validateData([
            {key:'storeId',value:storeId,validators:['required']},
            {key:'customerId',value:customerId,validators:['required']},
            {key:'customerDeliveryAddressId',value:customerDeliveryAddressId,validators:['required']},
            {key:'items',value:items,validators:['required']},
        ])
        
        var id = String(Math.floor(Math.random() * 1000));
        var totalAmount = 0;
        var storeName = "";
        var customerDeliveryAddress:String = "";
        items.forEach(element=>{
            var item = this.getItemData(element['id']);
            if(item){
            var itemAmount = item.price * element['quantity']; 
            totalAmount += itemAmount;
            }
           
        });
        this.storeService.getStores().forEach(element=>{
            if(element.id == storeId){
                storeName = element.name;
                return false;
            }
        })
        customerDeliveryAddress = this.customerService.getCustomerAddress(customerId,customerDeliveryAddressId);
        var order = new Order(id,totalAmount,storeName,customerId,customerDeliveryAddress,items);
        this.orders.push(order);
        return id;
    }
    listOrders(){
        var ordersInfo:object[] = [];
        console.log(this.orders);
        this.orders.forEach(element=>{
            ordersInfo.push({
                id:element.id,
                customerName:this.customerService.getCustomerProfile(element.customerId).name,
                customerAddress:element.customerDeliveryAddress,
                total:element.total,
            })
        })
        return ordersInfo ? ordersInfo: [];
    }
    getItemData(id):Items{
        var items = this.itemsService.getitems();
        var index = items.findIndex(item => item.id === id);  
        var item = items[index];
        return item
    }

}