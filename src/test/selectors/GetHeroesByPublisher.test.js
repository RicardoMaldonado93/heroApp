import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';


describe("test for GetHeroesByPublisher", () =>{

    test('should show error message when not contain publisher ', () => {
        const { result }  = renderHook( () => getHeroesByPublisher("disney") );
        const { current } = result;
        expect( current ).toBe(`Publisher not valid`);
    });

    test('should show error message when not send publisher ', () => {
        const { result }  = renderHook( () => getHeroesByPublisher() );
        const { current } = result;
        expect( current ).toBe(`Publisher not valid`);
    });


    
});