<?php

namespace App\Http\Controllers;

use App\Mail\ContactConfirmation;
use App\Mail\NewContactMessage;
use App\Mail\ReplyMessage;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function getMessages(){
        
     $messages = Contact::with('replies')->latest()->get();
                 
        return inertia('admin/message', [
            'messages' => $messages->map(function ($contact) {
                return [
                    'id' => $contact->id,
                    'name' => $contact->name,
                    'email' => $contact->email,
                    'project' => $contact->project,
                    'message' => $contact->message,
                    'status' => $contact->status,
                    'created_at' => $contact->created_at->format('M d, Y h:i A'),
                    'replies' => $contact->replies->map(function ($reply) {
                        return [
                            'id' => $reply->id,
                            'reply_message' => $reply->reply_message,
                            'subject' => $reply->subject,
                            'created_at' => $reply->created_at->format('M d, Y h:i A'),
                        ];
                    }),
                ];
            }),
            'meta' => [
                'total' => $messages->count(),
                'unread_count' => $messages->where('status', 'unread')->count(),
            ]
        ]);
       
    }

    public function createContact(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'project' => 'required|string|max:255',
                'message' => 'required|string|min:20',
            ]);

            if ($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            }

            $contact = Contact::create([
                'name' => $request->name,
                'email' => $request->email,
                'project' => $request->project,
                'message' => $request->message,
                'status' => 'unread',
               
            ]);


                // return redirect()->back()->with('success', 'Message created successfully!');
                return redirect(url()->previous() . '#contact')
                ->with('success', 'Thank you for your message! I will get back to you within 24-48 hours.');


            } catch (\Throwable $th) {
                Log::error('Contact form submission failed: ' . $th->getMessage(), [
                'request' => $request->all(),
                'exception' => $th
            ]);

            return back()
                ->withErrors(['general' => 'Something went wrong. Please try again later.'])
                ->withInput()
                ->with('error', 'Failed to submit message. Please try again.');
        }
    }

    // public function createMessage()
    // {
    //     $messages = Contact::orderBy('created_at', 'desc')->get();
        
    //     return inertia('admin/message', [
    //         'messages' => $messages->map(function ($contact) {
    //             return [
    //                 'id' => $contact->id,
    //                 'name' => $contact->name,
    //                 'email' => $contact->email,
    //                 'project' => $contact->project,
    //                 'message' => $contact->message,
    //                 'status' => $contact->status,
    //                 'created_at' => $contact->created_at->format('M d, Y h:i A'),
    //             ];
    //         })
    //     ]);
    // }


    //old 
    // public function sendReply(Request $request)
    // {
    //     $request->validate([
    //         'contact_id' => 'required|exists:contacts,id',
    //         'to_email' => 'required|email',
    //         'subject' => 'required|string',
    //         'reply_message' => 'required|string',
    //     ]);

    //     // Find the original contact message
    //     $contact = Contact::find($request->contact_id);

    //     // Send reply email
    //     Mail::to($request->to_email)->send(new ReplyMessage(
    //         $request->subject,
    //         $request->reply_message,
    //         $contact
    //     ));

    //     // Mark as replied
    //     $contact->update(['status' => 'replied']);

    //     return back()->with('success', 'Reply sent successfully!');
    // }

    //new

    // public function sendReply(Request $request)
    // {
    //     $request->validate([
    //         'contact_id' => 'required|exists:contacts,id',
    //         'to_email' => 'required|email',
    //         'subject' => 'required|string',
    //         'reply_message' => 'required|string',
    //     ]);

    //     $contact = Contact::find($request->contact_id);

    //     // Send email
    //     Mail::to($request->to_email)->send(new ReplyMessage(
    //         $request->subject,
    //         $request->reply_message,
    //         $contact
    //     ));

    //     // Save reply to database
    //     $contact->replies()->create([
    //         'reply_message' => $request->reply_message,
    //         'subject' => $request->subject,
    //     ]);

    //     // Mark as replied
    //     $contact->update(['status' => 'replied']);

    //     return back()->with('success', 'Reply sent successfully!');
    // }

    //newest 

    public function sendReply(Request $request)
{
    $request->validate([
        'contact_id' => 'required|exists:contacts,id',
        'to_email' => 'required|email',
        'subject' => 'required|string',
        'reply_message' => 'required|string',
    ]);

    try {
        $contact = Contact::find($request->contact_id);

        // Send email
        Mail::to($request->to_email)->send(new ReplyMessage(
            $request->subject,
            $request->reply_message,
            $contact
        ));

        // Save reply to database
        $reply = $contact->replies()->create([
            'reply_message' => $request->reply_message,
            'subject' => $request->subject,
        ]);

        // Mark as replied
        $contact->update(['status' => 'replied']);

        // Get updated contact with replies for frontend
        $updatedContact = Contact::with('replies')->find($request->contact_id);
        
        // Format the data (same format as your getMessages method)
        $formattedContact = [
            'id' => $updatedContact->id,
            'name' => $updatedContact->name,
            'email' => $updatedContact->email,
            'project' => $updatedContact->project,
            'message' => $updatedContact->message,
            'status' => $updatedContact->status,
            'created_at' => $updatedContact->created_at->format('M d, Y h:i A'),
            'replies' => $updatedContact->replies->map(function ($reply) {
                return [
                    'id' => $reply->id,
                    'reply_message' => $reply->reply_message,
                    'subject' => $reply->subject,
                    'created_at' => $reply->created_at->format('M d, Y h:i A'),
                ];
            }),
        ];

        // Return data for frontend update
        return redirect()->back()->with([
            'success' => 'Reply sent successfully!',
            'updated_contact' => $formattedContact,
            'reply_id' => $reply->id,
        ]);

    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Failed to send reply: ' . $e->getMessage());
    }
}

    // Optional: Mark message as read

    public function markAsRead($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['status' => 'read']);

        return back()->with('success', 'Message marked as read.');
    }

    // // Optional: Delete message
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return back()->with('success', 'Message deleted successfully.');
    }


}
