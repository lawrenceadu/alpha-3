import { render } from '@testing-library/react';

import DotStepper from './dot-stepper';

describe('DotStepper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DotStepper />);
    expect(baseElement).toBeTruthy();
  });
});
