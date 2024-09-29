import { type ClassValue, clsx } from "clsx";
import { type ForwardRefRenderFunction, forwardRef, type PropsWithoutRef, type RefAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fr<T, P>(
  component: ForwardRefRenderFunction<T, P>
) {
  const wrapped = forwardRef<T, PropsWithoutRef<P> & RefAttributes<T>>((props, ref) =>
    component(props as P, ref)
  );
  wrapped.displayName = component.displayName || component.name;
  return wrapped;
}

export function se<
  T = HTMLElement,
  P extends React.HTMLAttributes<T> = React.HTMLAttributes<T>
>(Tag: keyof React.ReactHTML, ...classNames: ClassValue[]) {
  const component = fr<T, P>(({ className, ...props }, ref) => (
    // @ts-expect-error Too complicated for TypeScript
    <Tag ref={ref} className={cn(...classNames, className)} {...props} />
  ));
  let checkedTag = Tag[0] ?? 'no-tag'
  component.displayName = checkedTag.toUpperCase() + Tag.slice(1);
  return component;
}