
import { useState, useEffect } from 'react';


// const testimonials = [
//         {
//             id: 1,
//             name: "Juan Dela Cruz",
//             title: "Software Engineer",
//             location: "Ph",
//             message: "This service is amazing! It really helped me grow my career.",
//             image: "https://via.placeholder.com/100"
//         },
//         {
//             id: 2,
//             name: "Maria Santos",
//             title: "UI/UX Designer",
//             location: "Ph",
//             message: "The design and user experience are top-notch. Highly recommended!",
//             image: "https://via.placeholder.com/100"
//         },
//         {
//             id: 3,
//             name: "Pedro Pascual",
//             title: "Project Manager",
//             message: "It made managing projects so much easier and efficient.",
//             image: "https://via.placeholder.com/100"
//         },
//         {
//             id: 4,
//             name: "Ana Reyes",
//             title: "Fullstack Developer",
//             location: "Ph",
//             message: "Fast, reliable, and user-friendly. Definitely worth it!",
//             image: "https://via.placeholder.com/100"
//         },
//         {
//             id: 5,
//             name: "Mark Villanueva",
//             title: "Data Analyst",
//             location: "Ph",
//             message: "Helped me visualize and analyze data better.",
//             image: "https://via.placeholder.com/100"
//         }
//     ];
// export const useTestimonialSlider = (testimonials, autoSlideInterval = 4000, visibleCount = 3) => {
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