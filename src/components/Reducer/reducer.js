import { type } from "../Type/reducerType";
export function reducer(state, action){
    let {SET_EMAIL} = type;
    switch (action.type) {
        case SET_EMAIL:{ 
            return   [...state, {userEmail:action.email}]
        }
    
        default:
            break;
    }

}