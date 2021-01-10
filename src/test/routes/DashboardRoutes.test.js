import React from 'react';
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { DashboardRoutes } from "../../routers/DashboardRoutes";
import { AuthContext } from "../../auth/AuthContext";

describe("test with <DashboardRoutes />", () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: { name: "Ricardo", logged: true }
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter>
                <DashboardRoutes />
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('should be match with snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should be contain the username', () => {
        expect( wrapper.find(".text-info").text().trim() ).toBe( contextValue.user.name );
    });

    test("should be shown the 'MARVEL SCREEN' page ", () => {
        expect( wrapper.find("h1").text().trim() ).toBe( "MARVEL SCREEN" );
    });

    test("should be contain at least one card or more", () => {
        expect( wrapper.find(".card-columns").find(".card").length >= 1 ).toBeTruthy();
    });

    test("if alter ego and character are equals, not show characters ", () => {
        const card = wrapper.find(".card-body").at(0);
        
        expect( card.find("#alter-ego").exists()).toBeTruthy();
        expect( card.find("#characters").exists()).toBeFalsy();
    })
});
