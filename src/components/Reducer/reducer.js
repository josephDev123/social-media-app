import { type } from "../Type/reducerType";
export function reducer(state, action){
    let {SET_EMAIL_USERNAME} = type;
    switch (action.type) {
        case SET_EMAIL_USERNAME:{ 
            return   [...state, {userEmail:action.email, username:action.username}]
        }
    
        default:
            break;
    }

}