import { cn } from '@/lib/utils';
import type { ImgHTMLAttributes } from 'react';
import { Link as RouterLink, useLocation, useNavigate, type LinkProps } from 'react-router-dom';

type AppLinkProps = Omit<LinkProps, 'to'> & {
  href?: string;
  to?: LinkProps['to'];
};

export function Link({ href, to, ...props }: AppLinkProps) {
  return <RouterLink to={to ?? href ?? '/'} {...props} />;
}

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

export function Image({ fill, className, alt = '', sizes: _sizes, priority: _priority, ...props }: ImageProps) {
  if (fill) {
    return (
      <img
        alt={alt}
        className={cn('absolute inset-0 h-full w-full object-cover', className)}
        {...props}
      />
    );
  }

  return <img alt={alt} className={className} {...props} />;
}

export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (path: string) => {
      void navigate(path);
    },
    replace: (path: string) => {
      void navigate(path, { replace: true });
    },
    back: () => {
      void navigate(-1);
    }
  };
}

export function usePathname() {
  return useLocation().pathname;
}

export function notFound(): never {
  throw new Error('Not Found');
}

export function redirect(path: string): never {
  throw new Error(`Redirect:${path}`);
}

export default Image;
