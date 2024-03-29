import SimpleStepContext from "./SimpleStepContext";

type JsonValue = string | number | boolean | null | JsonArray | JsonObject;
interface JsonArray extends Array<JsonValue> {}
interface JsonObject {
    [key: string]: JsonValue;
}


export class Steps {
    static createFunction<TInput = any, TOutput = any>(factory: (context: SimpleStepContext, input: TInput) => TOutput) {
    }


    static random(start: number, end: number) {
    }

    static unique(array: Array<any>) {
    }

    static base64Encode(data: string): string {
        return "";
    }

    static delay() {

    }
}