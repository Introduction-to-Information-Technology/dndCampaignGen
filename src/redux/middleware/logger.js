export function logger(store) {
    return function (next) {
        return function (action) {
            
                console.log('\nrunning logging middleware')
                console.log("\nintercepted " + action.type + " action in middleware before it got to reducer")
                let currentState = store.getState();
                console.log('\ncurrent state before action affects reducer' + JSON.stringify(currentState))
            

                console.log('\nletting action pass to reducer.');
                next(action);
                currentState = store.getState();
                console.log('\ncurrent state after action affected reducer' + JSON.stringify(currentState));
           
            
        };
    };
}