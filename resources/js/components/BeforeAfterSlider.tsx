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
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
    beforeImage,
    afterImage,
    beforeLabel,
    afterLabel,
    className = "",
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
                        className="object-cover"
                    />
                }
                itemTwo={
                    <ReactCompareSliderImage
                        src={afterImage}
                        alt="After restoration"
                        className="object-cover"
                    />
                }
                style={{
                    height: "400px",
                    borderRadius: "0.5rem",
                }}
                className="shadow-lg"
            />

            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {lblBefore}
            </div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {lblAfter}
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
