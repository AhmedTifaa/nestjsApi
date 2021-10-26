import { ApiProperty} from '@nestjs/swagger';
export class customerBody{
    @ApiProperty()
    name:string
    @ApiProperty()
    email:string
    @ApiProperty()
    phone:string
    @ApiProperty()
    addresses:[]
}