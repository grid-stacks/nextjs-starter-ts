import React from "react";
import { shallow } from "enzyme";
import Home from "../index";

describe("index page", () => {
	it("should have Head component", () => {
		const subject = shallow(<Home />);

		expect(subject.find("Head")).toHaveLength(1);
	});
});
