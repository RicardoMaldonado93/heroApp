import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";
import React from 'react';
import { getHeroesByName } from "../../../selectors/getHeroesByName";

describe('Test for Search Screen', () => {
   
    test('should be match with snapshot', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={ SearchScreen }/>
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find(".alert-info").text().trim() ).toBe("Search a hero");
    });

    test("should show 'batman' in input, queryString and a HeroCard", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={ SearchScreen }/>
            </MemoryRouter>
        );

        expect( wrapper.find("input").prop("value") ).toBe("batman");
        expect( wrapper.find("HeroCard").exists()).toBeTruthy();
        expect( wrapper ).toMatchSnapshot();

    });

    test('should show error when no find a hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=testNotFound']}>
                <Route path="/search" component={ SearchScreen }/>
            </MemoryRouter>
        );

        expect( wrapper.find("input").prop("value") ).toBe("testNotFound");
        expect( wrapper.find(".alert-danger").text().trim()).toBe("There's not a hero with testNotFound");
        expect( getHeroesByName("testNotFound") ).toEqual([]);
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call history push', () => {

        const historyMock = {
            push: jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component= { ()=> <SearchScreen history={ historyMock } /> }/>
            </MemoryRouter>
        );

        wrapper.find("input").simulate("change",{
            target:{
                name: "searchText",
                value:"batman"
            }
        });

        wrapper.find("form").prop("onSubmit")({
            preventDefault(){}
        });

        expect( historyMock.push ).toHaveBeenLastCalledWith("?q=batman");
    });
    
    
});
