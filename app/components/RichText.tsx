import { cn } from '~/lib/utils';

interface Props {
  content: string;
  className?: string;
}
export function RichText({ content, className }: Props) {
  return (
    <div
      className={cn('rich-text', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}
