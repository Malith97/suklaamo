'use client';

import { useMemo, useState } from 'react';
import Image, { type ImageProps } from 'next/image';

const fallbackPlaceholder = '/gallery/suklaamo.png';

type SmartImageProps = Omit<ImageProps, 'onError'> & {
  fallbackSrc?: string;
  skeletonClassName?: string;
  wrapperClassName?: string;
  imgClassName?: string;
};

export default function SmartImage({
  src,
  alt,
  wrapperClassName = '',
  imgClassName = '',
  fallbackSrc = fallbackPlaceholder,
  skeletonClassName = 'animate-pulse bg-[#f3efe5]',
  priority,
  ...rest
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const normalizedSrc = useMemo(() => {
    if (typeof src === 'string') {
      return src.startsWith('/') ? src : `/${src}`;
    }
    return src;
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!isLoaded && (
        <div className={`absolute inset-0 ${skeletonClassName}`} aria-hidden="true" />
      )}
      <Image
        src={hasError ? fallbackSrc : normalizedSrc}
        alt={alt ?? ''}
        className={`relative h-full w-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${imgClassName}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        {...rest}
      />
    </div>
  );
}
