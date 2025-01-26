import { render } from '@testing-library/react';

import TabMenuHorizontal from './tab-menu-horizontal';

describe('TabMenuHorizontal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabMenuHorizontal />);
    expect(baseElement).toBeTruthy();
  });
});
