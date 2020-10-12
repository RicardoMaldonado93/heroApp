import { mount } from "enzyme";
import React from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { AppRouter } from '../../routers/AppRouter';

describe('Test with <AppRouter />', () => {

   test("should be shown login if it isn't logged", () => {
       const contextValue = {
           dispatch: jest.fn(),
           user:{ logged: false }
       };

       const wrapper = mount(
           <AuthContext.Provider value={ contextValue }>
               <AppRouter />
           </AuthContext.Provider>
       );

       expect( wrapper ).toMatchSnapshot();
   });

   test("should be shown the marvel component if it authenticated", () => {
        const contextValue = {
            dispatch: jest.fn(),
            user:{ logged: true, name: "Ricardo" }
        };

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );
 
        expect( wrapper.find(".navbar" ).exists()).toBeTruthy();
        expect( wrapper.find("h1").text().trim() ).toBe("MARVEL SCREEN");
   });
   
    
});
