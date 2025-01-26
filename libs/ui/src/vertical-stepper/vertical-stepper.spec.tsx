import { render } from '@testing-library/react';

import VerticalStepper from './vertical-stepper';

describe('VerticalStepper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VerticalStepper />);
    expect(baseElement).toBeTruthy();
  });
});
