import { useEffect, useState } from "react";
import { SVGS } from "../constants/svgs";

export default function Carousel({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSelectImage = (index: number) => {
        setCurrentIndex(index);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const currentImg = images?.[currentIndex];

    useEffect(() => {
        if (images?.length) {
            setCurrentIndex(0);
        }
    }, [images]);

    return (
        <div className="flex col-span-2 h-full gap-10" data-testid='product-gallery'>
            <ImageList
                images={images}
                selectedIndex={currentIndex}
                onSelectImg={handleSelectImage}
            />
            <ImagePreview
                src={currentImg}
                alt={`Image ${currentIndex + 1}`}
                onPrev={handlePrev}
                onNext={handleNext}
            />
        </div>
    );
}

function ImageList({
    images,
    onSelectImg,
    selectedIndex,
}: {
    images: string[];
    onSelectImg: (index: number) => void;
    selectedIndex: number;
}) {
    return (
        <div className="flex flex-col gap-4">
            {images?.map((image, i) => (
                <div
                    key={i}
                    className={`h-32 w-32 cursor-pointer border-2 transition-all duration-150 ${selectedIndex === i
                        ? "border-blue-500 scale-105"
                        : "border-transparent hover:border-gray-300"}`}
                    onClick={() => onSelectImg(i)}
                >
                    <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
}

function ImagePreview({
    src,
    alt,
    onPrev,
    onNext,
}: {
    src?: string;
    alt: string;
    onPrev: () => void;
    onNext: () => void;
}) {
    return (
        <div className="h-full w-full max-h-[680px] relative">
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                loading="lazy"
            />
            <button
                onClick={onPrev}
                className="w-8 h-8 bg-[#434343] text-white flex items-center justify-center absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer hover:bg-[#5a5a5a] transition"
            >
                {SVGS.arrow_left}
            </button>
            <button
                onClick={onNext}
                className="w-8 h-8 bg-[#434343] text-white flex items-center justify-center absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer hover:bg-[#5a5a5a] transition"
            >
                {SVGS.arrow_right}
            </button>
        </div>
    );
}
