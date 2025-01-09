"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import gsap from "gsap";
import React, { FormEvent, useEffect, useState } from "react";

// Define the type for form data
interface FormData {
  email: string;
}

//TODO: The google sheet is stoill returning blank, find out how to fix this.

const MoreToCome: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent, data: FormData) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/submitForm", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSubmitting(false);
      setEmail("");

      if (!res.ok) {
        // Read and log the error response text for debugging
        const errorText = await res.text();
        console.error("Error response:", errorText);
        setMessage("Failed to submit form. Please try again.");
        return;
      }

      // Handle successful response
      const result = await res.json();
      setMessage(result.message || "Form submitted successfully!");
    } catch (error) {
      // Handle unexpected errors
      console.error("Error submitting the form:", error);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    // GSAP animations go here
    const logoTl = gsap.timeline({
      repeat: -1, // Repeat indefinitely
      yoyo: true, // Optional: make the animation reverse after each repeat
    });
    logoTl.fromTo(
      "#first-path",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, delay: 0.2 }
    );

    logoTl.fromTo(
      "#second-path",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, delay: 0.2 }
    );

    logoTl.fromTo(
      "#third-path",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 1.5 }
    );
  }, []);

  return (
    <div className="w-full flex shadow-xl h-screen z-[70] md:px-6">
      <div className="w-full h-full bg-white dark:bg-black text-gray-800 dark:text-gray-100 rounded-t-3xl mx-auto text-center p-6 sm:p-12 z-30 shadow-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
          There’s More to Come!
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-[600px] mx-auto">
          We’re working hard to bring you exciting new features and updates.
          Stay tuned as we continue to evolve and deliver a world-class
          experience.
        </p>

        {/* logo light */}
        <div className="w-full flex justify-center my-10 dark:hidden">
          <svg
            width="102"
            height="32"
            viewBox="0 0 102 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" width="32" height="32" rx="16" fill="#09090B" />
            <path
              id="first-path"
              d="M13.6835 6.47614L19.2479 16.1139L13.6835 14.7371L8.11915 16.1139L13.6835 6.47614Z"
              fill="white"
            />
            <path
              id="second-path"
              d="M19.4499 25.9049L25.0143 16.2671L19.4499 17.6439L13.8855 16.2671L19.4499 25.9049Z"
              fill="white"
            />
            <path
              id="third-path"
              d="M44.833 7.43333C46.0033 7.43333 47.0273 7.67714 47.9294 8.116C48.8071 8.55486 49.5141 9.18876 50.0018 10.0177C50.4894 10.8467 50.7332 11.7975 50.7332 12.8703C50.7332 13.9674 50.4894 14.9183 50.0018 15.7472C49.5141 16.5762 48.8071 17.2101 47.9294 17.649C47.0273 18.0878 46.0033 18.3072 44.833 18.3072H40.9077V24.5H38.1039V7.43333H44.833ZM40.9077 15.8691H44.5892C45.5888 15.8691 46.3934 15.601 46.9785 15.0646C47.5637 14.5282 47.8806 13.7968 47.8806 12.8703C47.8806 11.9438 47.588 11.2124 47.0029 10.676C46.4178 10.1396 45.6132 9.87143 44.6136 9.87143H40.9077V15.8691ZM51.0997 14.9183C51.6117 13.943 52.3187 13.2116 53.2452 12.6752C54.1717 12.1389 55.22 11.8707 56.4147 11.8707C57.6094 11.8707 58.6578 12.1145 59.5842 12.6021C60.5107 13.0897 61.2178 13.7968 61.7541 14.6745C62.2905 15.5766 62.5587 16.625 62.5831 17.8196C62.5831 18.161 62.5587 18.4779 62.51 18.8192H53.0989V18.9655C53.1477 20.0627 53.489 20.916 54.1229 21.5499C54.7324 22.1838 55.5614 22.5008 56.5854 22.5008C57.3899 22.5008 58.0726 22.3301 58.6334 21.94C59.1698 21.5499 59.5355 21.0135 59.7305 20.3065H62.3637C62.1199 21.5743 61.5103 22.6227 60.5107 23.4272C59.5111 24.2562 58.2677 24.6463 56.7804 24.6463C55.4639 24.6463 54.3423 24.4025 53.3671 23.8661C52.3919 23.3297 51.6604 22.5983 51.124 21.623C50.5877 20.6722 50.3439 19.5507 50.3439 18.2829C50.3439 17.015 50.5877 15.8935 51.0997 14.9183ZM59.9012 16.8931C59.7793 15.991 59.4136 15.284 58.804 14.772C58.1945 14.26 57.4387 13.9918 56.5122 13.9918C55.6345 13.9918 54.9031 14.26 54.2692 14.7964C53.6353 15.3328 53.294 16.0154 53.1964 16.8931H59.9012ZM63.7854 14.9183C64.2974 13.943 65.0044 13.2116 65.9309 12.6752C66.8574 12.1389 67.9058 11.8707 69.1004 11.8707C70.2951 11.8707 71.3435 12.1145 72.2699 12.6021C73.1964 13.0897 73.9035 13.7968 74.4399 14.6745C74.9762 15.5766 75.2444 16.625 75.2688 17.8196C75.2688 18.161 75.2444 18.4779 75.1957 18.8192H65.7846V18.9655C65.8334 20.0627 66.1747 20.916 66.8087 21.5499C67.4181 22.1838 68.2471 22.5008 69.2711 22.5008C70.0756 22.5008 70.7583 22.3301 71.3191 21.94C71.8554 21.5499 72.2212 21.0135 72.4162 20.3065H75.0494C74.8055 21.5743 74.1959 22.6227 73.1963 23.4272C72.1967 24.2562 70.9533 24.6463 69.466 24.6463C68.1495 24.6463 67.0279 24.4025 66.0527 23.8661C65.0775 23.3297 64.3461 22.5983 63.8097 21.623C63.2733 20.6722 63.0295 19.5507 63.0295 18.2829C63.0295 17.015 63.2733 15.8935 63.7854 14.9183Z"
              fill="white"
            />
          </svg>
        </div>

        {/* logo dark */}
        <div className="w-full justify-center my-10 hidden dark:flex">
          <svg
            width="102"
            height="32"
            viewBox="0 0 102 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" width="32" height="32" rx="16" fill="white" />
            <path
              id="first-path"
              d="M13.6835 6.47614L19.2479 16.1139L13.6835 14.7371L8.11915 16.1139L13.6835 6.47614Z"
              fill="black"
            />
            <path
              id="second-path"
              d="M19.4499 25.9049L25.0143 16.2671L19.4499 17.6439L13.8855 16.2671L19.4499 25.9049Z"
              fill="black"
            />
            <path
              id="third-path"
              d="M44.833 7.43333C46.0033 7.43333 47.0273 7.67714 47.9294 8.116C48.8071 8.55486 49.5141 9.18876 50.0018 10.0177C50.4894 10.8467 50.7332 11.7975 50.7332 12.8703C50.7332 13.9674 50.4894 14.9183 50.0018 15.7472C49.5141 16.5762 48.8071 17.2101 47.9294 17.649C47.0273 18.0878 46.0033 18.3072 44.833 18.3072H40.9077V24.5H38.1039V7.43333H44.833ZM40.9077 15.8691H44.5892C45.5888 15.8691 46.3934 15.601 46.9785 15.0646C47.5637 14.5282 47.8806 13.7968 47.8806 12.8703C47.8806 11.9438 47.588 11.2124 47.0029 10.676C46.4178 10.1396 45.6132 9.87143 44.6136 9.87143H40.9077V15.8691ZM51.0997 14.9183C51.6117 13.943 52.3187 13.2116 53.2452 12.6752C54.1717 12.1389 55.22 11.8707 56.4147 11.8707C57.6094 11.8707 58.6578 12.1145 59.5842 12.6021C60.5107 13.0897 61.2178 13.7968 61.7541 14.6745C62.2905 15.5766 62.5587 16.625 62.5831 17.8196C62.5831 18.161 62.5587 18.4779 62.51 18.8192H53.0989V18.9655C53.1477 20.0627 53.489 20.916 54.1229 21.5499C54.7324 22.1838 55.5614 22.5008 56.5854 22.5008C57.3899 22.5008 58.0726 22.3301 58.6334 21.94C59.1698 21.5499 59.5355 21.0135 59.7305 20.3065H62.3637C62.1199 21.5743 61.5103 22.6227 60.5107 23.4272C59.5111 24.2562 58.2677 24.6463 56.7804 24.6463C55.4639 24.6463 54.3423 24.4025 53.3671 23.8661C52.3919 23.3297 51.6604 22.5983 51.124 21.623C50.5877 20.6722 50.3439 19.5507 50.3439 18.2829C50.3439 17.015 50.5877 15.8935 51.0997 14.9183ZM59.9012 16.8931C59.7793 15.991 59.4136 15.284 58.804 14.772C58.1945 14.26 57.4387 13.9918 56.5122 13.9918C55.6345 13.9918 54.9031 14.26 54.2692 14.7964C53.6353 15.3328 53.294 16.0154 53.1964 16.8931H59.9012ZM63.7854 14.9183C64.2974 13.943 65.0044 13.2116 65.9309 12.6752C66.8574 12.1389 67.9058 11.8707 69.1004 11.8707C70.2951 11.8707 71.3435 12.1145 72.2699 12.6021C73.1964 13.0897 73.9035 13.7968 74.4399 14.6745C74.9762 15.5766 75.2444 16.625 75.2688 17.8196C75.2688 18.161 75.2444 18.4779 75.1957 18.8192H65.7846V18.9655C65.8334 20.0627 66.1747 20.916 66.8087 21.5499C67.4181 22.1838 68.2471 22.5008 69.2711 22.5008C70.0756 22.5008 70.7583 22.3301 71.3191 21.94C71.8554 21.5499 72.2212 21.0135 72.4162 20.3065H75.0494C74.8055 21.5743 74.1959 22.6227 73.1963 23.4272C72.1967 24.2562 70.9533 24.6463 69.466 24.6463C68.1495 24.6463 67.0279 24.4025 66.0527 23.8661C65.0775 23.3297 64.3461 22.5983 63.8097 21.623C63.2733 20.6722 63.0295 19.5507 63.0295 18.2829C63.0295 17.015 63.2733 15.8935 63.7854 14.9183Z"
              fill="black"
            />
          </svg>
        </div>

        {/* Email input */}
        <form
          className=" flex flex-col items-center md:flex-row md:items-center gap-10 max-w-[600px] mx-auto my-10"
          onSubmit={(e) => handleSubmit(e, { email })}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className=" h-[50px] md:h-[60px] py-3"
          />

          <Dialog>
            <DialogTrigger
              disabled={isSubmitting}
              className="rounded-[12px] font-medium text-[16px] md:text-[20px] w-[140px] md:w-[170px] h-[50px] md:h-[60px] z-30 bg-black dark:bg-white text-white dark:text-black"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{message ? message : ""}</DialogTitle>
                <DialogDescription>
                  Email Submitted , You can return back to the site !
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </form>

        <p>
          Thank your for always been there for us, the sky is the starting
          point.🚀{" "}
        </p>
      </div>
    </div>
  );
};

export default MoreToCome;
