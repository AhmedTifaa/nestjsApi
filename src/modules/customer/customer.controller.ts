import { Controller,Get,Post,Body,Param } from '@nestjs/common';
import { customerService } from './customer.service';
import { customerBody } from './customerSwagger.model';
import { ApiCreatedResponse,ApiResponse,ApiOkResponse,ApiProperty, ApiBody} from '@nestjs/swagger';



@Controller('customer')
export class CustomerController {
    constructor(private customerService:customerService){}
    @Post()
    @ApiBody({description:"created successfully",type:customerBody})
    @ApiResponse({ status: 200, description: 'created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request Data ( invalid post data )' })
    @ApiResponse({ status: 400, description: 'Customer Already Exsist' })
    createCustomer(
        @Body('name') name:string,
        @Body('email') email:string,
        @Body('phone') phone:string,
        @Body('addresses') addresses:[]
    ):{id:string}{
       var customerId = this.customerService.insertCustmer(name,email,phone,addresses);
        return {id:customerId};
    }
    @Get()
    @ApiResponse({ status: 200, description: 'listed successfully' })
    getCustomers():object{
        return this.customerService.getCustomers();
    }
    @Post(':id')
    @ApiResponse({ status: 200, description: 'listed customers successfully' })
    @ApiResponse({ status: 404, description: 'customer not found' })
    getCustomer(@Param('id') customerId: string):object{
       var customer = this.customerService.getCustomerProfile(customerId);
        return customer;
    }
}

