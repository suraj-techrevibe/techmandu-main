import { cn } from '~/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  includeTop?: boolean;
  contain?: boolean;
  center?: boolean;
  wide?: boolean;
}

export default function Container({
  children,
  includeTop = false,
  contain,
  center = true,
  wide = true,
  className,
  ...rest
}: ContainerProps) {
  return (
    <section
      className={cn(
        'px-3 md:px-12 lg:px-6',
        {
          'pt-32 xl:pt-40 2xl:pt-60': includeTop,
          'mx-auto': center,
          'max-w-7xl 2xl:px-0': wide,
          'max-w-6xl xl:px-0': !wide,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
