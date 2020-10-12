import { AuthContext }  from "../../../auth/AuthContext";
import { Navbar }  from "../../../components/ui/Navbar";
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Router } from "react-router-dom";
import { types } from "../../../types/types";

describe('test with <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn(),
        location: {},
    };
   
    const contextValue = {
        dispatch: jest.fn(),
        user: { logged: true, name: "Ricardo" }
    }

    const wrapper = mount(
        <AuthContext.Provider value = { contextValue }>
            <MemoryRouter>
                <Router history = { historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(()=>{
        jest.clearAllMocks();
    });

    test('should be match with snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should be contain the username equal to argument', () => {
        expect( wrapper.find(".text-info").text().trim() ).toBe( contextValue.user.name );
    });
    
    test('should be call logout function and use the history', () => {
        
        wrapper.find("button").prop("onClick")();

        expect( contextValue.dispatch ).toBeCalledWith( { type: types.logout } );
        expect( historyMock.replace ).toBeCalledWith( "/login" );
    });

    
});
