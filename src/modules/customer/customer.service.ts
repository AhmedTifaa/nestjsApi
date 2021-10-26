import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { Customer } from './customer.model';
import { Validator } from '../../helpers/validator';
let customersData:Customer[] = [];
@Injectable()
export class customerService{
    private customers:Customer[] = customersData;
    insertCustmer(name:string,email:string,phone:string,addresses:[]){
        new Validator().validateData([
            {key:'name',value:name,validators:['required']},
            {key:'email',value:email,validators:['required','email']},
            {key:'phone',value:phone,validators:['required','phone']},
            {key:'addresses',value:addresses,validators:['required']}
        ])
        this.exsistEmail(email);
        var id = String(Math.floor(Math.random() * 1000));
        var addresseObj:any = [];
        addresses.forEach(element => {
            var addressId:String = String(Math.floor(Math.random() * 1000));
            addresseObj.push({id:addressId,address:element});
        });
        var customer = new Customer(id,name,email,phone,addresseObj);
        this.customers.push(customer);
        customersData = this.customers;
        return id;
    }
    getCustomers(){
        return this.customers;
    }
    getCustomerProfile(customerId:string){
        var customer = this.findCustomer(customerId);
        return customer;
    }
    getCustomerAddresses(customerId:string){
        var customer = this.findCustomer(customerId);
       return customer.addresses;
    }
    getCustomerAddress(customerId:string,addressId:string):String{
        var customer = this.findCustomer(customerId);
        var deliveryAddress:String = "";
        customer.addresses.forEach(element=>{
            if(element.id == addressId){
                deliveryAddress = element.address;
            } 
        });
        return deliveryAddress;
    }
    private findCustomer(id: string): Customer {
        console.log(id);
        console.log(this.customers);
        const customerIndex = this.customers.findIndex(customer => customer.id == id);
        console.log(customerIndex);
        const customer = this.customers[customerIndex];
        if (!customer) {
          throw new NotFoundException('Customer Not Exsist');
        }
        return customer;
    }
    private exsistEmail(email:string){
        const customerIndex = this.customers.findIndex(customer => customer.email === email);
        console.log(customerIndex);
        if (customerIndex != -1) {
            throw new NotFoundException('Customer Already Exsist');
          }
          return true;

    }
}