import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { MotionBackground } from './motion-background';

describe('Motion background', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<MotionBackground />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should contain 3 clickable buttons', () => {

  });

  it('should contain descriptive text and an age rating', () => {

  });

  it('should first show image and then video preview for movie', () => {

  });

  it('should start playing movie if play button is clicked', () => {

  });

  it('should open episodes and info box if More Info is clicked', () => {

  });

  it('should mute noise if mute button is pressed', () => {

  });

  it('should change mute button to video restart video once video is finished', () => {

  });
});
