"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
const users_service_1 = require("../users/users.service");
let PaymentService = class PaymentService {
    constructor(configService, usersService) {
        this.configService = configService;
        this.usersService = usersService;
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2025-03-31.basil',
        });
    }
    async createCustomer(userId, email) {
        const customer = await this.stripe.customers.create({
            email,
            metadata: {
                userId,
            },
        });
        await this.usersService.update(userId, {
            stripeCustomerId: customer.id,
        });
        return customer;
    }
    async createSubscription(customerId, priceId, paymentMethodId) {
        await this.stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });
        await this.stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });
        const subscription = await this.stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],
        });
        return subscription;
    }
    async cancelSubscription(subscriptionId) {
        return this.stripe.subscriptions.cancel(subscriptionId);
    }
    async createPaymentIntent(amount, currency = 'usd') {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return paymentIntent;
    }
    async handleWebhook(event) {
        switch (event.type) {
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
                const subscription = event.data.object;
                await this.usersService.updateSubscriptionStatus(subscription.metadata.userId, subscription.status);
                break;
            case 'customer.subscription.deleted':
                const deletedSubscription = event.data.object;
                await this.usersService.updateSubscriptionStatus(deletedSubscription.metadata.userId, 'canceled');
                break;
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                break;
        }
    }
    async constructWebhookEvent(rawBody, signature, secret) {
        return this.stripe.webhooks.constructEvent(rawBody, signature, secret);
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map