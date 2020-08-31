import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { SliderItem } from './slider-item';

describe('Slider item', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<Slider />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should play trailer video if available on mouseover', () => {

  });

  it('should play movie/show if play button is clicked', () => {

  });

  it('should add movie to My List if + button is pressed', () => {

  });

  it('should highlight thumb symbol if movie is liked or disliked', () => {

  });

  it('should open episodes and info box if More Info button is pressed', () => {

  });

  it('should show descriptive tooltip when mouseover any button except play', () => {

  });
});
