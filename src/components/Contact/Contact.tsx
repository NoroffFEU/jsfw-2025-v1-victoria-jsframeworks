import React, { useState } from "react";
import "./Contact.css";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface FormState {
    fullName: string;
    subject: string;
    email: string;
    message: string;
}

export default function Contact() {
    const [form, setForm] = useState<FormState>({ fullName: "", subject: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.fullName.trim() || !form.subject.trim() || !form.email.trim() || !form.message.trim()) {
            toast.error("Please fill out all fields");
            return;
        }

        if (!validateEmail(form.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Message sent — thank you!");

            setForm({ fullName: "", subject: "", email: "", message: "" });
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <h1>Contact Us</h1>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <label className="form-label">
                    Full name
                    <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Your full name"
                        required
                    />
                </label>

                <label className="form-label">
                    Subject
                    <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Subject"
                        required
                    />
                </label>

                <label className="form-label">
                    Email
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="you@example.com"
                        required
                    />
                </label>

                <label className="form-label">
                    Message
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Write your message here"
                        rows={6}
                        required
                    />
                </label>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                </button>
                {loading && <LoadingSpinner />}
            </form>
        </div>
    );
}