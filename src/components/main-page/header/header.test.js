import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import { Header } from './header';

describe('Main header bar', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<Header />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should change the url if the buttons are clicked', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <Header />
      </Router>,
    );

    const homeButton = getByRole('button', { name: 'Home' });
    const seriesButton = getByRole('button', { name: 'Series' });
    const filmsButton = getByRole('button', { name: 'Films' });
    const latestButton = getByRole('button', { name: 'Latest' });
    const myListButton = getByRole('button', { name: 'My List' });
    const kidsButton = getByRole('button', { name: 'Children' });

    fireEvent.click(seriesButton);
    expect(history.location.pathname).toEqual('/browse/genre/83');

    fireEvent.click(filmsButton);
    expect(history.location.pathname).toEqual('/browse/genre/34399');

    fireEvent.click(latestButton);
    expect(history.location.pathname).toEqual('/latest');

    fireEvent.click(myListButton);
    expect(history.location.pathname).toEqual('/browse/my-list');

    fireEvent.click(kidsButton);
    expect(history.location.pathname).toEqual('/Kids');

    fireEvent.click(homeButton);
    expect(history.location.pathname).toEqual('/browse');

  });



});
