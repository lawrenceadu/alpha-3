'use client';

import {
  Button,
  Checkbox,
  ButtonGroup,
  CompactButton,
  LinkButton,
  SocialButton,
} from '@alpha-3/ui';
import * as Icon from '@remixicon/react';

function Page() {
  return (
    <div>
      <Button.Root variant="error">Button</Button.Root>

      <ButtonGroup.Root>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={Icon.RiLayoutGridLine} />
          Grid view
        </ButtonGroup.Item>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={Icon.RiListCheck} />
          List view
        </ButtonGroup.Item>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={Icon.RiLayout2Line} />
          Gallery view
        </ButtonGroup.Item>
      </ButtonGroup.Root>

      <CompactButton.Root>
        <CompactButton.Icon as={Icon.RiHeart2Fill} />
      </CompactButton.Root>

      <LinkButton.Root variant="primary">Link button</LinkButton.Root>

      <SocialButton.Root brand="apple">Apple</SocialButton.Root>

      <Checkbox.Root onClick={() => console.log('hi')} />
    </div>
  );
}

export default Page;
