import { Controller,Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private itemsService:ItemsService){}
    @Get()
    @ApiResponse({ status: 200, description: 'listed items or products successfully' })
    getItems():object{
        return this.itemsService.getitems();
    }
}
