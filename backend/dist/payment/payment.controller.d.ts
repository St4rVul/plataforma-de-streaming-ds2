import { PaymentService } from './payment.service';
import { User } from '../users/entities/user.entity';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    createCustomer(body: {
        email: string;
    }, user: User): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Customer>>;
    createSubscription(body: {
        priceId: string;
        paymentMethodId: string;
    }, user: User): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Subscription>>;
    cancelSubscription(body: {
        subscriptionId: string;
    }): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Subscription>>;
    createPaymentIntent(body: {
        amount: number;
    }): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.PaymentIntent>>;
    handleWebhook(signature: string, rawBody: Buffer): Promise<void>;
}
