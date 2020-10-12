import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { PrivateRouter } from "../../routers/PrivateRouter";
import React from 'react';


describe("Test in '<PrivateRouter />'", () => {
   
    const props = {
        location:{
            pathname: '/marvel',
        }
    };

    Storage.prototype.setItem = jest.fn();

    test("should be shown the component if it's authenticated and save in localStorage", () => {

        /**
         *  HOC: Hight Order Component
         * 
         *  El MemoryRouter es un HOC, hecho para hacer pruebas de rutas a evaluar
         * 
         *  Cuando un elemento es HOC y se debe hacer un test a los childs components, no se debe utilizar shallow, 
         *  ya que el mismo solo renderiza el componente HOC evitando que se renderizen los child components,
         *  para ello debemos de utilizar mount, esto sirve para renderizar toda la estructura deseada para el test.
         */

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRouter 
                    isAuthenticated = { true }
                    component = { () => <span> Prueba de componente renderizado si esta logueado </span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find("span").exists()).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith( "lastPath", "/marvel" )
    });

    test("should be block th component if isn't authenticated", () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRouter 
                    isAuthenticated = { false }
                    component = { () => <span> Prueba de componente renderizado si esta logueado </span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( !wrapper.find("span").exists()).toBeTruthy();
    });
    
    
});
