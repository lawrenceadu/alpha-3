import { render } from '@testing-library/react';

import AvatarGroupCompact from './avatar-group-compact';

describe('AvatarGroupCompact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AvatarGroupCompact />);
    expect(baseElement).toBeTruthy();
  });
});
