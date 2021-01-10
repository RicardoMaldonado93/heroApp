import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import { useForm } from '../../hooks/useForm';

describe("Unitary test for 'useForm'", () => {

    const initialForm = {
        name: "Ricardo",
        email: "ricardo@gmail.com"
    }
   
    test("should return default values", () => {
        const { result } = renderHook( ()=> useForm(initialForm) );
        const [ values, handleInputChange, reset ] = result.current;

        expect( values ).toEqual( initialForm );
        expect( typeof handleInputChange ).toBe( "function" );
        expect( typeof reset ).toBe( "function" );
    });

    test("should return default values without value", () => {
        const { result } = renderHook( ()=> useForm() );
        const [ values ] = result.current;

        expect( values ).toEqual( {} );
    });

    test("should be change value of name with call the function 'handleInputChange()'", () => {
        const { result } = renderHook( ()=> useForm(initialForm) );
        const [ , handleInputChange ] = result.current;
        
        act( ()=>{
            handleInputChange({
                target:{
                    name: "name",
                    value: "Raul"
                }
            });
        });

        const [ values ] = result.current;

        expect( values ).toEqual( {...initialForm, name: "Raul" });

    });

    test("should be reset to default value with call the function 'reset()'", () => {
        const { result } = renderHook( ()=> useForm(initialForm) );
        const [ , handleInputChange, reset ] = result.current;

        act( ()=>{
            handleInputChange({
                target:{
                    name: "name",
                    value: "Raul"
                }
            });
            reset();
        });
        
        const [ values ] =  result.current;

        expect( values ).toEqual( initialForm );
    
    });
    
});
