import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import {
  MemoryRouter,
  Router,
} from 'react-router-dom';
import fetch from "jest-fetch-mock";
import '@testing-library/jest-dom/extend-expect';

import { createMemoryHistory } from 'history';
import { SliderItem } from './slider-item';

beforeEach(() => {
  fetch.resetMocks();
});
// jest.mock('node-fetch');
// global.fetch=jest.fn();

describe('Slider item', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<SliderItem />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should fetch data correctly', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { backdrop_path: '/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg' }}));
    const history = createMemoryHistory();
    const { findByAltText } = render(
      <Router history={history}>
        <SliderItem />
      </Router>,
    );

    const element1 = await findByAltText('Slider image');
    expect(element1).toBeInTheDocument();
  });

  it('should display image as long as there is no image error', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { backdrop_path: '/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg' }}));
    const history = createMemoryHistory();
    const { findByAltText } = render(
      <Router history={history}>
        <SliderItem />
      </Router>,
    );

    const element1 = await findByAltText('Slider image');
    expect(element1).toBeInTheDocument();
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
