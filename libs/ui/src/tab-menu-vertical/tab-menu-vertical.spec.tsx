import { render } from '@testing-library/react';

import TabMenuVertical from './tab-menu-vertical';

describe('TabMenuVertical', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabMenuVertical />);
    expect(baseElement).toBeTruthy();
  });
});
