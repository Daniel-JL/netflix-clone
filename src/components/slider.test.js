import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Slider, fetchSliderItemIds } from './slider';
import 'isomorphic-fetch';

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

  it('should highlight arrow buttons on mouseover', () => {

  });

  it('should fetch 42 movie/tv show ids and store them in an array', () => {
    //  TODO
    //  1. Figure out how to mock fetch - normal fetch is too slow
    
    const data = fetchSliderItemIds();
    console.log(data);

    expect(data).toHaveLength(42);
  });
});
