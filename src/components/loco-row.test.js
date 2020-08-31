import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { LocoRow } from './loco-row';

describe('Loco row component', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<LocoRow />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});