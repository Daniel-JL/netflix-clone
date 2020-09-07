import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { SearchInput } from './search-input';

describe('Search input', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<SearchBox />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should dismount if another view is activated', () => {

  });

  it('should cause app to enter search view when something is typed in bar', () => {

  });

  it('should add text to url as it is input', () => {

  });

  it('should remember initial url state', () => {

  });

  it('should add an x button to the box when something is typed to clear search', () => {

  });

  it('should dismount box if the magnifying glass symbol is pressed again', () => {

  });
});
