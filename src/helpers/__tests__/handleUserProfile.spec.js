import Profile from '../../user-profile/index';
import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

describe('User Profile Card', () => {
  let wrapper;
  let props;

  beforeEach(() => {

    wrapper = shallow(<Profile {...props} />);
  });


  describe('html elements should render', () => {
    const users = require('../../helpers/users.json');

    // it('should display `occupation`', () => {
    //   expect(wrapper.find('.text-grey').text()).toEqual('Residential electrician');
    // });

    it('should display `name`', () => {
      expect(users[0].name).toEqual('Charlie S. Gerardi');
    });

    it('should display `occupation`', () => {
      expect(users[0].occupation).toEqual('Residential electrician');
    });
  });
});
