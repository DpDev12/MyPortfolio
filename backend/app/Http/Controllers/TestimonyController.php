<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonyController extends Controller
{
    public function getTestimony()
    {
        $testimony = Testimonial::latest()->get();
        return inertia('admin/testimony',[
            'testimony' => $testimony
        ]);
    }

    public function changeStatus(Request $request, Testimonial $testimonial)
    {
        $request->validate([
            'status' => 'required|in:pending,approved,rejected'
        ]);

        $testimonial->update(['status' => $request->status]);
        return back()->with('success', 'Status updated!');
    }


    // UserController.php - add this method
    public function submitTestimonial(Request $request) {

        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'title' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'testimonial' => 'required|string|min:20',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240'
            ]);
            
            $testimonialData = [
                'name' => $request->name,
                'email' => $request->email,
                'title' => $request->title,
                'location' => $request->location,
                'testimonial' => $request->testimonial,
                'status' => 'pending', // for approval
                'submitted_at' => now()
            ];
            
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('testimonials', 'public');
                $testimonialData['image'] = $imagePath;
            }
            
            Testimonial::create($testimonialData);
            
            return response()->json([
                'success' => true,
                'message' => 'Thank you! Your testimonial has been submitted and is pending approval.'
            ]);

                // return redirect()->back()->with('success', 'Project created successfully!');

            } catch (\Throwable $th) {
                return back()->withErrors(['general' => 'Failed to submit testimonial.'])->withInput();
        }
    }

    public function addTestimonial()
    {
        return inertia('user/TestimonialForm');
    }
}
