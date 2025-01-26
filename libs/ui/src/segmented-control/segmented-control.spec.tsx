import { render } from '@testing-library/react';

import SegmentedControl from './segmented-control';

describe('SegmentedControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SegmentedControl />);
    expect(baseElement).toBeTruthy();
  });
});
