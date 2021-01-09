import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/ui/heroes/HeroScreen";
import React from 'react';

describe('test with <HeroScreen />', () => {
    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    const wrapper = mount(
        <MemoryRouter initialEntries={["/hero"]}>
            <HeroScreen history = { historyMock }/>
        </MemoryRouter>
    );

    test("should be shown redirect component if it isn't args in the URL ",()=>{
        expect( wrapper.find("Redirect").exists() ).toBeTruthy();
    }); 

    test("should be shown a hero, if param is exist and found",()=>{
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeID" component={ HeroScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find("h3").text().trim() ).toBe("Spider Man");
    }); 

    test('should be return the last screen with PUSH', () => {
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeID" 
                    component={ ()=> <HeroScreen history={ historyMock }/> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledWith('/');
        expect( historyMock.goBack ).not.toHaveBeenCalled();

    });

    test('should be return the last screen with GOBACK', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeID" 
                    component={ ()=> <HeroScreen history={ historyMock }/> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).not.toHaveBeenCalledWith('/');
        expect( historyMock.goBack ).toHaveBeenCalled();
    });
    
    test('should be call to redirect if isn´t Hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spidera']}>
                <Route  
                    path="/hero/:heroeID" 
                    component={ ()=> <HeroScreen history={ historyMock }/> } 
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');
    })
    
});
