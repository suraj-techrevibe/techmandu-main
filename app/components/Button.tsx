import clsx from 'clsx';

export function Button(
  props: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>,
) {
  return (
    <button
      className={clsx(
        'focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-0 focus:ring-gray-800',
        'bg-primary2 hover:bg-orange-500 border rounded-md py-2 px-4 text-white font-medium ',
        'flex items-center justify-around gap-2',
        'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400',
        props.className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}
