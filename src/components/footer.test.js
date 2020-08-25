import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Footer } from './footer.jsx';

describe('Footer component', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<Footer />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});