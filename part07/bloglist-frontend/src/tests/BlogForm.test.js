import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import BlogForm from "../components/BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> event handler", async () => {
  const user = userEvent.setup();
  const addBlog = jest.fn();

  render(<BlogForm createBlog={addBlog} />);

  const titleField = screen.getByPlaceholderText("Title");
  const authorField = screen.getByPlaceholderText("Author");
  const urlField = screen.getByPlaceholderText("Url");
  const createButton = screen.getByText("create");

  await user.type(titleField, "testing a title field");
  await user.type(authorField, "testing a author field");
  await user.type(urlField, "testing a url field");
  await user.click(createButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0]["title"]).toBe("testing a title field");
  expect(addBlog.mock.calls[0][0]["author"]).toBe("testing a author field");
  expect(addBlog.mock.calls[0][0]["url"]).toBe("testing a url field");
});
