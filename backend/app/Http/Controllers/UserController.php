<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Project;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function dashboard(){
        // Sa controller mo
        return Inertia::render('pages/dashboard', [
            'projects' => Project::count(),
            'userCount' => User::count(),
            // 'reportCount' => Report::count(), 
            'logCount' => Log::count(),
        ]);
    }

    public function home() {
            return $this->portfolio();
    }
    
    public function portfolio() {
            $projects = Project::latest()->take(6)->get();
            $testimonials = $this->getTestimonials();

            return Inertia::render('user/portfolio', [
                'userProjects' => $projects,
                'useTestimonials' => $testimonials,
            ]);
    }

    private function getTestimonials() {
        
        // return Testimonial::all();
        return Testimonial::where('status', 'approved')->latest()->get();
       
    }

    public function getViewAllProject()
    {
        $allprojects = Project::all();
        // $allprojects = Project::latest()->paginate(12);
        return inertia('user/AllProjects', [
            'allprojects' => [
                'data' => $allprojects
            ]
        ]);
    }
    

    // UserController.php - add this method
    // public function submitTestimonial(Request $request) {

    //     try {
    //         $request->validate([
    //             'name' => 'required|string|max:255',
    //             'email' => 'required|email',
    //             'title' => 'required|string|max:255',
    //             'location' => 'required|string|max:255',
    //             'testimonial' => 'required|string|min:20',
    //             'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240'
    //         ]);
            
    //         $testimonialData = [
    //             'name' => $request->name,
    //             'email' => $request->email,
    //             'title' => $request->title,
    //             'location' => $request->location,
    //             'testimonial' => $request->testimonial,
    //             'status' => 'pending', // for approval
    //             'submitted_at' => now()
    //         ];
            
    //         if ($request->hasFile('image')) {
    //             $imagePath = $request->file('image')->store('testimonials', 'public');
    //             $testimonialData['image'] = $imagePath;
    //         }
            
    //         Testimonial::create($testimonialData);
            
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Thank you! Your testimonial has been submitted and is pending approval.'
    //         ]);

    //             // return redirect()->back()->with('success', 'Project created successfully!');

    //         } catch (\Throwable $th) {
    //             return back()->withErrors(['general' => 'Failed to submit testimonial.'])->withInput();
    //     }
    // }

    // public function addTestimonial()
    // {
    //     return inertia('user/TestimonialForm');
    // }
    
    // public function createContact(Request $request)
    // {
    //     try {

            
    //         $request->validate([
    //             'name' => 'required|string|max:255',
    //             'email' => 'required|email',
    //             'project' => 'required|string|max:255',
    //             'message' => 'required|string|min:20',
    //         ]);
            
    //         $contactData = [
    //             'name' => $request->name,
    //             'email' => $request->email,
    //             'project' => $request->project,
    //             'message' => $request->message,
               
    //         ];

    //             Contact::create($contactData);
            
    //             // return redirect()->back()->with('success', 'Message created successfully!');
    //             return redirect(url()->previous() . '#contact')->with('success', 'Message created successfully!');


    //         } catch (\Throwable $th) {
    //             return back()->withErrors(['general' => 'Failed to submit message.',
    //             ])->withInput();
    //     }
    // }


    // public function createContact(Request $request)
    // {
    //     try {

    //         $validator = Validator::make($request->all(), [
    //             'name' => 'required|string|max:255',
    //             'email' => 'required|email',
    //             'project' => 'required|string|max:255',
    //             'message' => 'required|string|min:20',
    //         ]);

    //         if ($validator->fails()) {
    //             return back()->withErrors($validator)->withInput();
    //         }

    //         Contact::create([
    //             'name' => $request->name,
    //             'email' => $request->email,
    //             'project' => $request->project,
    //             'message' => $request->message,
    //             // 'status' => 'unread',
               
    //         ]);

    //             // return redirect()->back()->with('success', 'Message created successfully!');
    //             return redirect(url()->previous() . '#contact')->with('success', 'Message created successfully!');


    //         } catch (\Throwable $th) {
    //             return back()->withErrors(['general' => 'Failed to submit message.',
    //             ])->withInput();
    //     }
    // }


}
