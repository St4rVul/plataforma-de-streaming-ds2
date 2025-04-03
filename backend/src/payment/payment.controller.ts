import { Controller, Post, Body, UseGuards, Get, Param, Headers } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../auth/decorators/user.decorator';


@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('create-customer')
  async createCustomer(@Body() body: { email: string }, @GetUser() user: User) {
    return this.paymentService.createCustomer(user.id, body.email);
  }

  @Post('create-subscription')
  async createSubscription(
    @Body() body: { priceId: string; paymentMethodId: string },
    @GetUser() user: User,
  ) {
    return this.paymentService.createSubscription(
      user.stripeCustomerId,
      body.priceId,
      body.paymentMethodId,
    );
  }

  @Post('cancel-subscription')
  async cancelSubscription(@Body() body: { subscriptionId: string }) {
    return this.paymentService.cancelSubscription(body.subscriptionId);
  }

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number }) {
    return this.paymentService.createPaymentIntent(body.amount);
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Body() rawBody: Buffer,
  ) {
    const event = await this.paymentService.constructWebhookEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    return this.paymentService.handleWebhook(event);
  }
} 