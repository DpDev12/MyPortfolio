<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::latest()->paginate(12);
        return inertia('admin/project', [
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'status' => ['required', 'string'],
            'image' => ['nullable', 'file', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:10240'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            
            if (!$file->isValid()) {
                return back()->withErrors(['image' => 'Invalid file upload.'])->withInput();
            }

            try {
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $imagePath = $file->storeAs('photos', $filename, 'public');
                
                if (!$imagePath) {
                    throw new \Exception('Failed to store file');
                }
                
            } catch (\Exception $e) {
                return back()->withErrors(['image' => 'Upload failed: ' . $e->getMessage()])->withInput();
            }
        }

        try {
            Project::create([
                'title' => $request->title,
                'body' => $request->body,
                'status' => $request->status,
                'image' => $imagePath,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            return redirect()->back()->with('success', 'Project created successfully!');
            
        } catch (\Exception $e) {
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            
            return back()->withErrors(['general' => 'Failed to save project.'])->withInput();
        }
    }

    // public function show(Project $project)
    // {
    //     return inertia('Projects/Show', [
    //         'project' => $project
    //     ]);
    // }

    public function edit(Project $project)
    {
        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'status' => ['required', 'string'],
            'image' => ['nullable', 'file', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:10240'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $imagePath = $project->image; // Keep existing image by default

        // Handle new image upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            
            if (!$file->isValid()) {
                return back()->withErrors(['image' => 'Invalid file upload.'])->withInput();
            }

            try {
                // Delete old image if exists
                if ($project->image && Storage::disk('public')->exists($project->image)) {
                    Storage::disk('public')->delete($project->image);
                }

                // Store new image
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $imagePath = $file->storeAs('photos', $filename, 'public');
                
                if (!$imagePath) {
                    throw new \Exception('Failed to store file');
                }
                
            } catch (\Exception $e) {
                return back()->withErrors(['image' => 'Upload failed: ' . $e->getMessage()])->withInput();
            }
        }

        try {
            $project->update([
                'title' => $request->title,
                'body' => $request->body,
                'status' => $request->status,
                'image' => $imagePath,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            return redirect()->back()->with('success', 'Project updated successfully!');
            
        } catch (\Exception $e) {
            return back()->withErrors(['general' => 'Failed to update project.'])->withInput();
        }
    }

    public function destroy(Project $project)
    {
        try {
            // Delete associated image if exists
            if ($project->image && Storage::disk('public')->exists($project->image)) {
                Storage::disk('public')->delete($project->image);
            }

            $project->delete();

            return redirect()->back()->with('success', 'Project deleted successfully!');
            
        } catch (\Exception $e) {
            return back()->withErrors(['general' => 'Failed to delete project.'])->withInput();
        }
    }
}