import React from "react";
import { useTranslation } from "react-i18next";
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
} from "react-compare-slider";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    className?: string;
    height?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
    beforeImage,
    afterImage,
    beforeLabel,
    afterLabel,
    className = "",
    height = "420px",
}) => {
    const { t } = useTranslation();
    const lblBefore = beforeLabel ?? t('restoration.before', 'Before');
    const lblAfter = afterLabel ?? t('restoration.after', 'After');
    return (
        <div className={`relative ${className}`}>
            <ReactCompareSlider
                itemOne={
                    <ReactCompareSliderImage
                        src={beforeImage}
                        alt="Before restoration"
                        className="object-cover w-full h-full"
                    />
                }
                itemTwo={
                    <ReactCompareSliderImage
                        src={afterImage}
                        alt="After restoration"
                        className="object-cover w-full h-full"
                    />
                }
                style={{
                    height: height,
                    width: "100%",
                    borderRadius: "0.75rem",
                }}
                className="shadow-xl"
            />

            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase z-10 pointer-events-none select-none shadow">
                {lblBefore}
            </div>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase z-10 pointer-events-none select-none shadow">
                {lblAfter}
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
