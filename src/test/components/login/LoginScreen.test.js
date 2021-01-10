import React from 'react';
import { mount, shallow } from 'enzyme';
import { LoginScreen } from '../../../components/ui/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('test with Login Screen', () => {

    const historyMock = {
        replace: jest.fn()
    }

    const contextMock =   {
        dispatch: jest.fn()
    }
    
    const wrapper = mount( 
        <AuthContext.Provider value   = { contextMock }>
            <LoginScreen history = { historyMock }/>
        </AuthContext.Provider>
    );

    test('should be match with snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });
   
    test("should be call dispatch and navigate", ()=>{
        const handleClick = wrapper.find("button").prop("onClick");

        handleClick();

        expect( contextMock.dispatch ).toHaveBeenLastCalledWith({
            type: types.login,
            payload:{
                name: "Ricardo"
            }
        });

        expect( historyMock.replace ).toHaveBeenCalled();

        localStorage.setItem("lastPath", "/dc");

        handleClick();
        expect( historyMock.replace ).toHaveBeenLastCalledWith("/dc");
    });
});
