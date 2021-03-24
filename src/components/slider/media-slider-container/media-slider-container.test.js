import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import {
  MemoryRouter,
  Router,
} from 'react-router-dom';
import fetch from "jest-fetch-mock";
import '@testing-library/jest-dom/extend-expect';
import { MediaSlider, fetchSliderItemIds } from '../media-slider';

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
    fetch.mockResponseOnce(JSON.stringify({ data: { backdrop_path: '/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg' }}));
    const history = createMemoryHistory();
    const { findByTestId, findByAltText } = render(
      <Router history={history}>
        <MediaSlider />
      </Router>,
    );

  });
});
