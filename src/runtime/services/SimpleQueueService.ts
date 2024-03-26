export type PublishMessageProps = {

}

export class SimpleQueueService {
    constructor(arn: string) {
    }

    publish(messsage: any, props: PublishMessageProps = {}) {        
    }

    publishWithCallback(
        messsage: any,
        callback: any, 
        props: PublishMessageProps = {}) {        
    }
}