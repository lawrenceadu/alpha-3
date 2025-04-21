'use client';

import { Button, Modal } from '@alpha-3/ui';
import * as Icon from '@remixicon/react';

function Page() {
  return (
    <div>
      <Modal.Root>
        <Modal.Trigger asChild>
          <Button.Root variant="neutral" mode="stroke">
            Open
          </Button.Root>
        </Modal.Trigger>

        <Modal.Content className="max-w-[800px]">
          <Modal.Header
            title="Modal"
            icon={Icon.Ri4kFill}
            description="This is a description"
          />
          <Modal.Body>This is a body</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
}

export default Page;
