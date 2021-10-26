export class Order {
    constructor(
     public id:string,
     public total:number,
     public storeName:string,
     public customerId:string,
     public customerDeliveryAddress:String,
     public items:object[]
    ) {}
  }