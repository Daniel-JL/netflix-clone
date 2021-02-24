import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { SearchBox } from './search-box';

describe('Search box', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<SearchBox />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should dismount text input if another view is activated', () => {

  });

  it('should dismount box if the magnifying glass symbol is pressed again', () => {

  });
});
