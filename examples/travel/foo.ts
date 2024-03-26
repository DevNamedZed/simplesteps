enum OrderStatus {
    Created = 'created',
}

type Order = {
    readonly orderId: string;
    readonly payment: string;
    readonly status: string;
    readonly version: string;
}

type OrderRequest = {
    readonly orderId: string;
}


class TravelStepFunctionFactory {
    constructor(
        public readonly orderServiceArn: string, 
        public readonly paymentServiceArn: string,
        public readonly airlineService: string,
        public readonly hotelService: string,
        public readonly carRentalServiceArn: string,
        public readonly failedDql: string,) {}


    @stepFunction
    async create(context: SimpleStepCotnext) {
        const workflowInput = context.getInput<OrderProcessRequest>()
        const failedDlq = SimpleQueueService()
        const orderService = Lambda<OrderRequest, Order>(this.orderServiceArn)

        let order: Order;
        try {
            order = await orderService.call(workflowInput);
        }
        catch (exception) {
            // Exception can only ever be a StepException.
            const stepException: StepException = exception;

            throw exception;
        }        
    }

    async hanleError() {

    }
}

function createStepFunction(
    orderService: String,
    paymentLambda: String,
    travelService: String,
    hotelService: String,
    vehicleService: String,
    ) {
    const entryInput = getInput();
    const orderId = entryInput.jpath("$.orderId")

    const orderService = Lambda.fromArn(orderService)
    const travelService = Lambda.fromArn(paymentLambda)
    const hotelService = Lambda.fromArn(paymentLambda)
    const vehicleService = Lambda.fromArn(paymentLambda)

    const order = await orderService.call({
        orderId
    })

    


}