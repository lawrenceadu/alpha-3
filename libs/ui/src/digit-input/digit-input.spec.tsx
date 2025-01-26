import { render } from '@testing-library/react';

import DigitInput from './digit-input';

describe('DigitInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DigitInput />);
    expect(baseElement).toBeTruthy();
  });
});
