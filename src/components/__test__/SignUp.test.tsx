import React from "react";
import { render, screen } from "@testing-library/react";
import UploadRoom from "../../routes/UploadRoom";

const SignUpModalProp = {
  count: 0,
  onIncrease: jest.fn(),
  onDecrease: jest.fn(),
};

describe("<SignUpModal />", () => {
  it("화면에 'Counter'라는 텍스트가 보이는지 테스트", () => {
    render(<UploadRoom />);
    const button = screen.getByText("로그인");

    expect(button).toBeDisabled();
  });
});
