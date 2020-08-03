import React from 'react';
import { cleanup, fireEvent, render, getByTestId } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { sum } from './App';

test('sum', () => {
  expect(sum(1, 2)).toBe(3);
});
