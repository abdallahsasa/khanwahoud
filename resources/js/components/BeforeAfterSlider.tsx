import React from "react";
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
    beforeLabel = "Before",
    afterLabel = "After",
    className = "",
}) => {
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
                {beforeLabel}
            </div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {afterLabel}
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
