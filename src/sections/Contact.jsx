"use client";
import { slideIn, staggerContainer } from "../utils/motion";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import EarthCanvas from "../utils/Earth";
import { contact } from "../constants";

const Contact = () => {
	const formRef = useRef(null);

	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		emailjs
			.send(
				contact.SERVICE_ID,
				contact.TEMPLATE_ID,
				{
					from_name: form.name,
					to_name: contact.name,
					from_email: form.email,
					to_email: contact.email,
					message: form.message,
				},
				contact.PUBLIC_KEY
			)
			.then(() => {
				setLoading(false);
				alert(
					"A humble thanks for reaching me out. I will respond to you as soon as possible."
				);
				setForm({
					name: "",
					email: "",
					message: "",
				});
			})
			.catch((error) => {
				setLoading(false);
				alert("Sorry!! Something went wrong!!");
			});
	};

	return (
		<motion.div
			variants={staggerContainer()}
			initial="hidden"
			whileInView="show"
			exit="hidden"
			viewport={{ once: true, amount: 0.25 }}
			className="padding max-w-7xl mx-auto relative"
		>
			<span className="hash-span" id='contact'>
				{" "}
				&nbsp;{" "}
			</span>
			<div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
				<motion.div
					variants={slideIn("left", "tween", 0.2, 1)}
					className="flex-[0.75] relative z-10 bg-[rgb(16,13,37)] p-10 rounded-3xl shadow-xl border border-white/10"
				>
					<div className="mb-8">
						<div className="flex items-center gap-3">
							<span className="inline-block w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded"></span>
							<p className="text-base sm:text-lg font-semibold uppercase tracking-wider text-secondary text-white animate-fadeIn">
								Get in Touch
							</p>
						</div>
						<h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
							<span className="text-primary">Contact</span>
							<span className="text-secondary"> Me</span>
						</h2>
						<div className="mt-2 h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full animate-slideIn"></div>
					</div>


					<form
						ref={formRef}
						onSubmit={handleSubmit}
						className="mt-12 flex flex-col gap-8"
					>
						<label className="flex flex-col">
							<span className="text-white font-medium mb-4">Your Name.</span>
							<input
								type="text"
								name="name"
								value={form.name}
								onChange={handleChange}
								placeholder="What's your name?"
								className="bg-white/10 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/20 font-medium focus:ring-2 focus:ring-primary transition"
							/>
						</label>
						<label className="flex flex-col">
							<span className="text-white font-medium mb-4">Your Email.</span>
							<input
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								placeholder="What's your email?"
								className="bg-white/10 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/20 font-medium focus:ring-2 focus:ring-primary transition"
							/>
						</label>
						<label className="flex flex-col">
							<span className="text-white font-medium mb-4">Your Message.</span>
							<textarea
								rows={7}
								name="message"
								value={form.message}
								onChange={handleChange}
								placeholder="What do you want to say?"
								className="bg-white/10 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/20 font-medium focus:ring-2 focus:ring-primary transition"
							/>
						</label>
						<button
							type="submit"
							className="bg-gradient-to-r from-primary to-secondary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl hover:scale-105 transition"
						>
							{loading ? "Sending..." : "Send"}
						</button>
					</form>
				</motion.div>
				<motion.div
					variants={slideIn("right", "tween", 0.2, 1)}
					className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
				>
					<EarthCanvas />
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Contact;
