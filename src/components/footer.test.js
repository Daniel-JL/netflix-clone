import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Footer } from './footer.jsx';

describe('Footer', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<Footer />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('contains row for social media links', () => {

  });

  it('contains table of links for various information', () => {

  });

  it('contains service code button that gives code on click', () => {

  });

  it('has copyright text at the very bottom of footer', () => {

  });
});
