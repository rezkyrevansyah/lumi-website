"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function UMKMStory() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7"
          >
            <span className="section-tag mb-3 inline-block">Cerita Kami</span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101828] mb-5 leading-snug"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              Lumi Beta Works Juga Mulai dari{" "}
              <span className="gradient-text">Nol</span>
            </h2>
            <div
              className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-4"
              style={{ fontFamily: "var(--font-opensans)" }}
            >
              <p>
                Lumi Beta Works dimulai dari seorang freelancer yang ingin membangun bisnis teknologinya sendiri. Bukan software house besar dengan modal berlimpah, melainkan satu orang dengan keberanian untuk mencoba.
              </p>
              <p>
                Di masa-masa awal itu, hampir semua klien kami adalah UMKM: pemilik barbershop yang capek mencatat antrian manual, pemilik toko yang butuh sistem kasir sendiri, studio foto yang kewalahan mengatur jadwal booking lewat chat. Semangat mereka untuk naik kelas lewat teknologi itulah yang membentuk cara kami bekerja sampai hari ini.
              </p>
              <p>
                Sekarang Lumi juga melayani instansi pemerintah dan korporat besar, tapi satu hal tidak berubah: kami tidak melupakan UMKM. Pintu kami tetap terbuka lebar untuk bisnis kecil yang ingin bertransformasi digital.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#F8F9FB] rounded-3xl p-8 sm:p-10 border border-gray-100 relative">
              <Quote className="w-9 h-9 text-[#2DD9A4]/40 mb-4" />
              <p
                className="text-[#101828] text-lg sm:text-xl font-semibold leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                Lumi Beta Works: Lumi (cahaya dari sebuah ide), Beta (keberanian untuk bereksperimen), Works (mengubah ide menjadi sesuatu yang nyata).
              </p>
              <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "var(--font-opensans)" }}>
                Filosofi yang sama kami pakai untuk membantu bisnis Anda: dari ide yang masih abstrak, menjadi sistem yang benar-benar bisa dipakai sehari-hari.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
