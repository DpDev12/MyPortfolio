<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReplyMessage extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    // public $replyContent;
    public $replyMessage;
    public $originalContact;

    /**
     * Create a new message instance.
     */
    // public function __construct($subject, $replyContent, $originalContact = null)
    // {
    //     $this->subject = $subject;
    //     $this->replyContent = $replyContent;
    //     $this->originalContact = $originalContact;
    // }

    public function __construct($subject, $replyMessage, $originalContact = null)
    {
        $this->subject = $subject;
        $this->replyMessage = $replyMessage;
        $this->originalContact = $originalContact;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject, // Use the dynamic subject
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.reply-message', // Fixed view name
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}