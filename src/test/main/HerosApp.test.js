import React from "react";
import { mount } from "enzyme";
import { HerosApp } from "../../HerosApp";

describe("Tests for HerosApp", () => {

  test("should show correctly", () => {
    const wrapper = mount(<HerosApp />);
    expect(wrapper).toMatchSnapshot();
  });

});
