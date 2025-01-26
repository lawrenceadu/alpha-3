import { render } from '@testing-library/react';

import CompactButton from './compact-button';

describe('CompactButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompactButton />);
    expect(baseElement).toBeTruthy();
  });
});
