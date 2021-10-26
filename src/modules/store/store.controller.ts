import { Controller,Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
    constructor(private storeService:StoreService){}
    @Get()
    @ApiResponse({ status: 200, description: 'listed stores successfully' })
    getStores(){
        return this.storeService.getStores();
    }
}
