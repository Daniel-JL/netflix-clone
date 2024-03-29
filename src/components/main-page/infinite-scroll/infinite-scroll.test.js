import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Router } from 'react-router-dom';
import fetch from "jest-fetch-mock";
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { InfiniteScroll } from './infinite-scroll';

describe('Infinite scroll component', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<InfiniteScroll />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
