
import { useState, useEffect } from 'react';

export const useTestimonialSlider = (testimonials, autoSlideInterval = 4000, visibleCount = 3) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        if (!testimonials || testimonials.length <= visibleCount) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                // Reset to 0 when we reach the end
                return nextIndex >= testimonials.length ? 0 : nextIndex;
            });
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [testimonials, autoSlideInterval, visibleCount]);

    // Navigation functions
    const goToNext = () => {
        if (!testimonials || testimonials.length <= visibleCount) return;
        
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex >= testimonials.length ? 0 : nextIndex;
        });
    };

    const goToPrev = () => {
        if (!testimonials || testimonials.length <= visibleCount) return;
        
        setCurrentIndex((prevIndex) => {
            const prevIndexNew = prevIndex - 1;
            return prevIndexNew < 0 ? testimonials.length - 1 : prevIndexNew;
        });
    };

    const goToSlide = (index) => {
        if (!testimonials || testimonials.length === 0) return;
        setCurrentIndex(Math.max(0, Math.min(index, testimonials.length - 1)));
    };

    // Get visible testimonials with proper circular behavior
    const getVisibleTestimonials = () => {
        if (!testimonials || testimonials.length === 0) return [];
        
        // If we have fewer testimonials than visibleCount, show all
        if (testimonials.length <= visibleCount) {
            return testimonials;
        }

        const visible = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % testimonials.length;
            visible.push(testimonials[index]);
        }
        return visible;
    };

    const visibleTestimonials = getVisibleTestimonials();

    return {
        currentIndex,
        visibleTestimonials,
        goToNext,
        goToPrev,
        goToSlide,
        totalTestimonials: testimonials?.length || 0,
        hasTestimonials: testimonials && testimonials.length > 0
    };
};