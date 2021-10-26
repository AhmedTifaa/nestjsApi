import { ApiProperty} from '@nestjs/swagger';
export class orderBody{
    @ApiProperty()
    storeId:number
    @ApiProperty()
    customerId:string
    @ApiProperty()
    customerDeliveryAddressId:string
    @ApiProperty()
    items:object[]
}