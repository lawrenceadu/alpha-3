import { render } from '@testing-library/react';

import AvatarEmptyIcons from './avatar-empty-icons';

describe('AvatarEmptyIcons', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AvatarEmptyIcons />);
    expect(baseElement).toBeTruthy();
  });
});
