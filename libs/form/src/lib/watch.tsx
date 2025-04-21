import { useWatch } from 'react-hook-form';

export interface WatchProps {
  name?: string;
  children: (value: any) => React.ReactNode;
}

export function Watch({ name, children }: WatchProps) {
  const value = useWatch({ name: name as string });
  return <>{children(value)}</>;
}
