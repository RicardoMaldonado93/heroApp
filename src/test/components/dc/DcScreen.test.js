import {shallow} from 'enzyme';
import React from 'react';
import { DcScreen } from '../../../components/dc/DcScreen';

describe('Unitary test for <DcScreen />', () => {
    
    const wrapper = shallow( <DcScreen /> );

    test('should be match with snapshot', () => {
        expect( wrapper ).toMatchSnapshot();     
    });
    
});
