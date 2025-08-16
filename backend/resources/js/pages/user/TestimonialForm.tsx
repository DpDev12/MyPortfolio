import "../../../css/scrollbar.css"
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import useCountries from '../../hooks/useCountries';
import { useForm } from '@inertiajs/react';

export default function TestimonialForm() {
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState('');

    const { data, setData, post, processing, reset } = useForm<{
        name: string,
        email: string,
        title: string,
        location: string,
        duration: string | null,
        built_with: string | null,
        budget: string | null,
        testimonial: string,
        image: File | null,
    }>({
        name: '',
        email: '',
        title: '',
        location: '',
        duration: null,
        built_with: null,
        budget: null,
        testimonial: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post('/api/submit-testimonial', {
            forceFormData: true, // Important for file uploads
            onSuccess: () => {
                setMessage('Thank you! Your testimonial has been submitted successfully and is pending approval.');
                reset();
                setShowForm(false);
            },
            onError: (errors) => {
                console.log('Testimonial errors:', errors);
                setMessage('Error: ' + (errors.message || Object.values(errors).flat().join(', ') || 'Failed to submit testimonial'));
            }
        });
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setData(name, files ? files[0] : value);
    };

    const countries = useCountries();

    const groupedCountries = countries.reduce((acc, country) => {
        const firstLetter = country[0]. toUpperCase();
        if(!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(country);
        return acc;
    }, {});

   return (
    <div className="w-full h-full flex absolute bg-slate-300">
        <div className="flex items-center justify-center max-w-2xl max-h-fit mx-auto p-6">
            {!showForm ? (
                // Initial landing view
                <div className="text-center bg-white rounded-2xl shadow shadow-slate-600 p-9">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Share Your Experience
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Have you worked with Paul Argie? We'd love to hear about your experience!
                    </p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Create Testimonial
                    </button>
                </div>
            ) : (
                // Form view
                <div className="max-w-2xl w-full max-h-[90vh] bg-white text-neutral-900 rounded-2xl shadow shadow-slate-600 overflow-hidden flex flex-col">
                    {/* Sticky Header with close button */}
                    <div className="sticky top-0 z-10 bg-white flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Submit Your Testimonial
                        </h2>
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-gray-500 hover:text-gray-700 text-xl cursor-pointer p-1"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Scrollable form content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {/* Success/Error message */}
                        {message && (
                            <div className={`p-4 mb-6 rounded-lg ${
                                message.includes('successfully') || message.includes('Thank you')
                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                    : 'bg-red-100 text-red-700 border border-red-300'
                            }`}>
                                {message}
                            </div>
                        )}

                        {/* Form fields */}
                        <div className="space-y-6">
                            {/* Name and Email */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="Your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            {/* Job Title and Location */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Job Title & Company *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="e.g., CEO @ TechCorp"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Location *
                                    </label>
                                    <select 
                                        name="location"
                                        value={data.location} 
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    >
                                        <option value="">Select Country</option>
                                        {Object.entries(groupedCountries).sort().map(([letter, countries]) => (
                                            <optgroup key={letter} label={letter}>
                                                {countries.map((country) => (
                                                    <option key={country} value={country}>
                                                        {country}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Duration and Build with */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Duration *
                                    </label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={data.duration ?? ''}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="Project duration"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Built with *
                                    </label>
                                    <input
                                        type="text"
                                        name="built_with"
                                        value={data.built_with ?? ''}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="e.g., React, Laravel, PHP, MySQL"
                                    />
                                </div>
                            </div>

                            {/* Project Cost */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Project Cost <span className="text-neutral-500 italic text-xs">(PHP/USD)</span> *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="budget"
                                        value={data.budget ?? ''}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="e.g., 1500.00"
                                    />
                                </div>
                                {/* Empty div for grid alignment */}
                                <div></div>
                            </div>

                            {/* Testimonial */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Your Testimonial *
                                </label>
                                <textarea
                                    name="testimonial"
                                    value={data.testimonial}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-vertical"
                                    placeholder="Share your experience working with Paul Argie... (minimum 20 characters)"
                                    minLength="20"
                                />
                                <div className="text-right text-sm text-gray-500 mt-1">
                                    {data.testimonial.length}/20 minimum
                                </div>
                            </div>

                            {/* Photo Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Your Photo (Optional)
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/jpeg,image/png,image/jpg,image/gif"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] ?? null;
                                        console.log('Selected file:', file);
                                        setData("image", file);
                                    }}
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Max file size: 2MB. Accepted formats: JPEG, PNG, JPG, GIF
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                                >
                                    {processing ? 'Submitting...' : 'Submit Testimonial'}
                                </button>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);
}