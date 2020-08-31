import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { SearchBox } from './search-box';

describe('Search box', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<SearchBox />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should start as a symbol and on click expand to a a bar', () => {

  });

  it('should cause app to enter search state when something is typed in bar', () => {

  });

  it('should add an x button to the bar when something is typed to clear search', () => {

  });

  it('should deactivate bar if the magnifying glass symbol is pressed again', () => {

  });
});
