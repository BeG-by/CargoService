import React from 'react';
import {configure, shallow} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16'
import WelcomeBody from "../components/pages/welcome-body";

configure({adapter: new Adapter()});

describe('WelcomeBody component testing', function () {
    it('Renders welcome message', function () {
        const welcomeWrapper = shallow(<WelcomeBody/>);

        expect(welcomeWrapper.exists(".text-body")).to.equal(true);
    });
});