import {shallow} from 'enzyme';
import React from 'react';
import { MarvelScreen } from '../../../components/marvel/MarvelScreen';

describe('Unitary test for <MarvelScreen />', () => {
    
    const wrapper = shallow( <MarvelScreen /> );

    test('should be match with snapshot', () => {
        expect( wrapper ).toMatchSnapshot();     
    });
    
});
