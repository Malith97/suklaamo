'use client';

import { useMemo, useState } from 'react';
import Image, { type ImageProps } from 'next/image';

const fallbackPlaceholder = '/gallery/suklaamo.png';

type SmartImageProps = Omit<ImageProps, 'onError'> & {
  fallbackSrc?: string;
  skeletonClassName?: string;
  wrapperClassName?: string;
  imgClassName?: string;
  sizes?: string;
};

export default function SmartImage({
  src,
  alt,
  wrapperClassName = '',
  imgClassName = '',
  fallbackSrc = fallbackPlaceholder,
  skeletonClassName = 'animate-pulse bg-[#f3efe5]',
  sizes,
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

  const imageAlt = typeof alt === 'string' ? alt : '';

  const imageProps: Omit<ImageProps, 'alt'> = {
    src: hasError ? fallbackSrc : normalizedSrc,
    className: `relative h-full w-full min-w-0 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${imgClassName}`,
    onLoadingComplete: () => setIsLoaded(true),
    onError: () => setHasError(true),
    loading: priority ? 'eager' : 'lazy',
    priority,
    ...(sizes ? { sizes } : {}),
    ...rest,
  };

  return (
    <div className={`relative overflow-hidden min-w-0 ${wrapperClassName}`}>
      {!isLoaded && (
        <div className={`absolute inset-0 ${skeletonClassName}`} aria-hidden="true" />
      )}
      <Image alt={imageAlt} {...imageProps} />
    </div>
  );
}
