/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import {
  MemoryRouter,
  Router,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { SearchInput } from './search-input';

describe('Search input', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(
      <MemoryRouter>
        <SearchInput />
      </MemoryRouter>,
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should cause app to enter search view when something is typed in bar', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <SearchInput />
      </Router>,
    );
    const textInput = getByRole('textbox', { name: '' });

    userEvent.type(textInput, 'a');
    expect(history.location.pathname).toBe('/search');
    expect(history.location.search).toBe('?q=a');

  });

  it('should add text to url as it is input', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <SearchInput />
      </Router>,
    );
    const textInput = getByRole('textbox', { name: '' });

    userEvent.type(textInput, 'a');
    expect(history.location.pathname).toBe('/search');
    expect(history.location.search).toBe('?q=a');
  });

  it('should remember initial url state', () => {

  });

  it('should add an x button to the box when something is typed. This button clears the search ', () => {

  });

});
