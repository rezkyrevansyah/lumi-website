"use client";

import React from "react";
import { motion } from "motion/react";
import { TestimonialsColumn, type TestimonialItem } from "@/components/ui/testimonials-columns-1";

const FALLBACK_REVIEWS: TestimonialItem[] = [
  {
    text: "The experience of working with Revan was truly great throughout the entire process. He constructed a full stack web application for our business in London precisely as we needed it. Communication was always clear, he got a quick grasp of our requirements, proposed some practical improvements, and met all the milestones on time.",
    name: "Winnie",
    role: "Business Owner • London, UK",
    rating: 5,
  },
  {
    text: "Nicee, bisa dari uiux sampe website jadi, gokil banget!",
    name: "Verified Client",
    role: "Client UI/UX & Web Development",
    rating: 5,
  },
  {
    text: "Luar biasa, diberi deadline 2 hari selesai dalam 1 hari, worth it!",
    name: "Ninda",
    role: "Web Development Client",
    rating: 5,
  },
  {
    text: "Kerjasama dengan mas Revan sangat professional, saya merekomendasikan untuk pembuatan UI/UX.",
    name: "Fahmi",
    role: "Client UI/UX Design",
    rating: 5,
  },
  {
    text: "Mantap, rekomended deh pokoknya.",
    name: "bimol7",
    role: "Client Project",
    rating: 5,
  },
  {
    text: "Nice, he do a full stack web development and can work using english. Outstanding results and give a lot of bonus. Good work",
    name: "Ron",
    role: "International Client • Full Stack Web",
    rating: 5,
  },
  {
    text: "Sip, rekomended untuk UI/UX. Respon bagus dan cepat.",
    name: "totocos",
    role: "Client UI/UX Design",
    rating: 5,
  },
  {
    text: "Sudah sering sama mas Revan, mantap dan selalu terpercaya!",
    name: "Verified Client",
    role: "Repeat Order Client",
    rating: 5,
  },
  {
    text: "Makasih kakk rekomenn banget!",
    name: "eca",
    role: "Client Project",
    rating: 5,
  },
];

interface DBTestimonial {
  id: number;
  quote: string;
  authorName: string;
  authorRole: string;
  rating: number | null;
  isFeatured: boolean | null;
  sortOrder: number | null;
}

interface TestimonialsProps {
  testimonials?: DBTestimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const reviews: TestimonialItem[] =
    testimonials && testimonials.length > 0
      ? testimonials.map((t) => ({
          text: t.quote,
          name: t.authorName,
          role: t.authorRole,
          rating: t.rating ?? 5,
        }))
      : FALLBACK_REVIEWS;

  const firstColumn = reviews.slice(0, 3);
  const secondColumn = reviews.slice(3, 6);
  const thirdColumn = reviews.slice(6, 9);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
        >
          <div className="flex justify-center mb-3">
            <span className="section-tag">Kata Klien Kami</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101828] tracking-tight"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Kenapa Mereka <span className="gradient-text">Percaya Kami</span>
          </h2>
          <p
            className="text-center text-gray-500 text-sm sm:text-base mt-4 max-w-xl"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            Ulasan autentik dari para klien lokal dan internasional yang telah mempercayakan pembuatan sistem website, UI/UX, dan aplikasi kepada tim kami.
          </p>
        </motion.div>

        <div className="flex justify-center gap-5 sm:gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[720px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={17} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={19}
          />
        </div>
      </div>
    </section>
  );
}
