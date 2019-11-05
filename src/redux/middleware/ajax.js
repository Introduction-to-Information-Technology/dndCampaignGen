

import { makeAjax } from "../../redux/actions/makeAjax";

export function ajax(store) {
    return function (next) {
        return function (action) {
         console.log('\nrunning ajax middleware')
            console.log("\nintercepted " + action.type + " action in middleware before it got to reducer")
            
            if (action.ajax == true) {
                console.log('\naction.ajax == true, so running code')
                
                switch (action.route) {
                    case '/getMonsters':
                        fetch(action.route).then((response) => {
                            return response.json()
                
                        }).then((data) => {
                            console.log(data)
                            store.dispatch(makeAjax(data, false, ""));
                            next(action);
                        })
                        break; 
                    
                    default: 
                        break;                    

                }
              
            } else {
                console.log('\naction.ajax == false so nothing will happen here')
                next(action);
            }
        
        };
    }
};