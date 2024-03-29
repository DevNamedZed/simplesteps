import { StateMachineDocument } from '../../../../src/asl/StateMachineDocument'
import SimpleStepContext from '../../../../src/runtime/SimpleStepContext';
import { Steps } from '../../../../src/runtime/Steps'

const lambdaOne = "";

type TestInput = {
    foo: string,
    bar: number
}
function bar1() {
    
}

function bar2() {
    
}

function bar3() {
    bar2()
    bar1()
    bar2()
}

function foo1() {
    const foo = {}
    const bar = JSON.stringify(foo)
    const foo2 = JSON.parse(bar)
    bar3();
    bar3();
}


function foo2() {
    foo1();
}

function foo3() {
    foo2();
}

function test(context: SimpleStepContext, input: TestInput) {
    
}

const stepFunction = Steps.createFunction(c => {
    foo3();
    
});

const stepFunction2 = Steps.createFunction<TestInput>(test);

const stepFunction3 = Steps.createFunction<TestInput>(function (context: SimpleStepContext, input: TestInput) {
    if (input.bar) {
        console.log('bar')
    }
});