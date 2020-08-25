import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { MovieBrowser } from './movie-browser.jsx'

describe('Movie browser component', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<MovieBrowser />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});