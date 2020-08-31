import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { AccountDropdown } from './account-dropdown';

describe('account dropdown in navbar', () => {

  it('renders correctly', () => {
    const wrapper = renderer.create(<AccountDropdown />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
  
  it('should show all available users', () => {

  });

  it('should have all options as clickable links', () => {

  });

  it('should activate on mouseover and deactivate on unmouseover', () => {

  });

  it('should activate/deactivate on click', () => {

  })
});
