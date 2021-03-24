import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Routes } from './routes';

describe('Search input', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<SearchBox />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should correctly load views depending on url', () => {
    //  TODO
    //  1. Check that each view component is mounted when specific urls are present
  });

});
