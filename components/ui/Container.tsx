import { ContainerProps } from '@/lib/types';

export default function Container({ children, className = '' }: ContainerProps): JSX.Element {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
