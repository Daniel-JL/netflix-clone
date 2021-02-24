import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Notifications } from './notifications';

describe('Notifications dropdown', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<Notifications />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should activate on mouseover and deactivate on de-mouseover', () => {

  });

  it('should increase slightly the icon size on first click', () => {

  });

  it('should deactivate on second mouse click and the toggle on subsequent clicks', () => {

  });

  it('should open episode and info box if dropdown item is clicked', () => {

  });

  it('should highlight item on mouseover', () => {

  });
});
