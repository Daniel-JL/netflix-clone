import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from './buttons';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<AccountDropdown />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should highlight text if LinkTextButton is clicked', () => {

  });
});
