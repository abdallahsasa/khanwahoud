import React from 'react';

interface ImageOptimizerProps {
    src: string;
    alt: string;
    className?: string;
    sizes?: string;
    priority?: boolean;
    videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ src, alt, className = '', sizes = '100vw', priority = false, videoProps = {} }) => {
    const isVideo = /\.(mp4|mov|avi|webm)$/i.test(src);

    if (isVideo) {
        const webmSrc = src.replace(/\.(mp4|mov|avi)($|\?)/i, '.webm$2');

        return (
            <video
                className={className}
                preload={priority ? 'auto' : 'metadata'}
                {...videoProps}
                onError={(e) => {
                    const video = e.target as HTMLVideoElement;
                    if (video.src !== src) {
                        video.src = src;
                        video.load();
                    }
                }}
            >
                <source src={webmSrc} type="video/webm" />
                <source src={src} type="video/mp4" />
                {alt && <track kind="descriptions" label={alt} />}
                Your browser does not support the video tag.
            </video>
        );
    }

    // Optimize image (webp fallback)
    const webpSrc = src.replace(/\.(jpg|jpeg|png)($|\?)/i, '.webp$2');

    return (
        <img
            src={webpSrc}
            alt={alt}
            className={className}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            sizes={sizes}
            onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = src;
            }}
        />
    );
};

export default ImageOptimizer;
