import { render } from '@testing-library/react';

import HorizontalStepper from './horizontal-stepper';

describe('HorizontalStepper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HorizontalStepper />);
    expect(baseElement).toBeTruthy();
  });
});
