export class Customer {
    constructor(
     public id:string,
     public name:string,
     public email:string,
     public phoneNumber:string,
     public addresses:[{id:String,address:String}]
    ) {}
  }