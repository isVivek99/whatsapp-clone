
// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {

    switch(action.type){

        case "SET_USER":
            return{
                ...state,
                user:action.user,
            }
            default:
                return state;
    }
}

