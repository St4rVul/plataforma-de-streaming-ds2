import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { UsersService } from '../users/users.service';
export declare class PaymentService {
    private configService;
    private usersService;
    private stripe;
    constructor(configService: ConfigService, usersService: UsersService);
    createCustomer(userId: string, email: string): Promise<Stripe.Response<Stripe.Customer>>;
    createSubscription(customerId: string, priceId: string, paymentMethodId: string): Promise<Stripe.Response<Stripe.Subscription>>;
    cancelSubscription(subscriptionId: string): Promise<Stripe.Response<Stripe.Subscription>>;
    createPaymentIntent(amount: number, currency?: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    handleWebhook(event: Stripe.Event): Promise<void>;
    constructWebhookEvent(rawBody: Buffer, signature: string, secret: string): Promise<Stripe.Event>;
}
