import { Controller, Get, Param } from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':tracking_number/tracking')
  async trackOrder(
    @Param('tracking_number') tracking_number: string,
  ): Promise<Order> {
    const orders = await this.orderService.orders({
      where: { tracking_number: tracking_number },
    });

    console.log(orders);

    return orders[0];
  }
}
