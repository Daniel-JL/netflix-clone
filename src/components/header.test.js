import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Header } from './header';

describe('Main header bar', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<Header />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a left side and a right side', () => {

  });

  it('should have 6 clickable buttons on the left side', () => {

  });

  it('should have 5 clickable elements on the right side', () => {

  });

  it('should highlight left elements if clicked except for netflix button', () => {

  });

  it('should change the app page state if navigation buttons are clicked', () => {

  });
});
