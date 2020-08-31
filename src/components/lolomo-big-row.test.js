import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { LolomoBigRow } from './lolomo-big-row';

describe('Lolomo big row row component', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<LolomoBigRow />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a video player', () => {

  });

  it('should have a mute button on the video player', () => {

  });

  it('should show the maturity rating beside the mute button', () => {

  });

  it('should have two buttons and a description beside the video player', () => {

  });
});