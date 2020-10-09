import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
  require('dotenv').config();
  fetch.resetMocks();
});
// jest.mock('node-fetch');
// global.fetch=jest.fn();

describe('Slider item', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<SliderItem />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should display image as long as there is no image error', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { backdrop_path: '/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg' }}));
    const history = createMemoryHistory();
    const { findByAltText } = render(
      <Router history={history}>
        <SliderItem mediaType="movie" mediaId="310131" />
      </Router>,
    );

    const element = await findByAltText('Slider image');
    expect(element).toBeInTheDocument();
  });

  it('should play trailer video if available on mouseover', () => {

  });

  it('should play movie/show if play button is clicked', () => {

  });

  it('should add movie to My List if + button is pressed', () => {

  });

  it('should highlight thumb symbol if movie is liked or disliked', () => {

  });

  it('should change url to open EpisodesAndInfoBox when More Info button is pressed', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { backdrop_path: '/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg' }}));
    const history = createMemoryHistory();
    const { getByRole, getByText } = render(
      <Router history={history}>
        <SliderItem mediaType="movie" mediaId="310131" />
      </Router>,
    );

    const moreInfoButton = await screen.getByRole('button', { name: 'v' });
    fireEvent.click(moreInfoButton);

    expect(history.location.pathname).toEqual('/browse/epsinfobox');
  });

  it('should show descriptive tooltip when mouseover any button except play', () => {

  });
});
