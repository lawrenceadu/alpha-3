'use client';

import { AlertToast, Button, toast } from '@alpha-3/ui';
import { useTranslations } from 'next-intl';

function Page() {
  const t = useTranslations('');

  return (
    <div>
      <Button.Root
        onClick={() =>
          toast.custom((t) => (
            <AlertToast.Root t={t} message="Hello world" status="error" />
          ))
        }
      >
        {t('home.title')}
      </Button.Root>
    </div>
  );
}

export default Page;
