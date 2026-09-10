import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

const VideoPlayer = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoRef.current)
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(videoRef.current);
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                videoRef.current.src = src;
            }
    }, [src]);

    return <video ref={videoRef} className="size-full" controls loop />;
};

export default VideoPlayer;
