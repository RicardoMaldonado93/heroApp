import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types"; 

describe('Test in authReducer', () => {
    
    
    test('should be return default state', () => {
        const state = authReducer( { logged: false }, {} )
        expect( state ).toEqual( { logged: false } );
    });

    test('should authenticate y set username', () => {
        const action = {
            type: types.login,
            payload: { name: "Ricardo" }
        };

        const { name, logged } = authReducer( { logged: false }, action );

        expect( name ).toBe( action.payload.name );
        expect( logged ).toBeTruthy();

    });

    test('should delete username and set logged in false', () => {
        
        const action = { type: types.logout};
        const { logged } = authReducer( { logged: true, name: "Ricardo" }, action );

        expect( logged ).toBeFalsy();
    });
    
    
})
