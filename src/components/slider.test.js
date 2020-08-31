import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Slider } from './slider';

describe('Slider', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<Slider />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should highlight slider item on mouseover after short delay', () => {

  });

  it('should scroll across to new set of slider items if arrow button is pressed', () => {

  });

  it('should add left arrow button once right arrow button has been pressed once', () => {

  });

  it('should update pagination indicator as arrow keys are pressed', () => {

  });

  it('arrow buttons should be highlighted on mouseover', () => {

  });
});