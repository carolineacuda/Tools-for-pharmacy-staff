
test('renders Tinzaparin Dosing Tool component', () => {
  render(<TinzaparinDosingTool />);
  const headingElement = screen.getByText(/Tinzaparin Dosing Tool goes here/i);
  expect(headingElement).toBeInTheDocument();
});
