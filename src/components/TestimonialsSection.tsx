"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, StarHalf, LinkedinIcon, GithubIcon } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  comment: string;
  relation: "Collègue" | "Client" | "Superviseur" | "Partenaire";
  socialLink?: {
    type: "linkedin" | "github" | "other";
    url: string;
  };
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophie Laurent",
    position: "RSSI",
    company: "CyberDefense Inc.",
    image: "/person1.svg", // fallback utilisé
    comment: "Nous avons travaillé ensemble sur plusieurs projets d'audit de sécurité. Son expertise en pentest et sa rigueur méthodologique ont permis d'identifier des vulnérabilités critiques qui avaient échappé aux précédents audits. Une collaboration de grande valeur.",
    relation: "Collègue",
    socialLink: {
      type: "linkedin",
      url: "https://linkedin.com/"
    },
    rating: 5
  },
  {
    id: 2,
    name: "Marc Dubois",
    position: "Directeur Technique",
    company: "SecureTech Solutions",
    image: "/person2.svg", // fallback utilisé
    comment: "J'ai eu la chance de superviser son travail pendant deux ans. Sa capacité à combiner des compétences offensives et défensives en sécurité est remarquable. Particulièrement efficace dans l'analyse des infrastructures complexes et la proposition de solutions adaptées.",
    relation: "Superviseur",
    socialLink: {
      type: "github",
      url: "https://github.com/"
    },
    rating: 5
  },
  {
    id: 3,
    name: "Julie Moreau",
    position: "Lead Développeuse",
    company: "CodeSecure",
    image: "/person3.svg", // fallback utilisé
    comment: "Sa contribution à notre équipe DevSecOps a transformé notre approche de la sécurité. Grâce à son expertise, nous avons intégré des pratiques de développement sécurisé dans notre pipeline CI/CD, améliorant considérablement la robustesse de nos applications.",
    relation: "Collègue",
    rating: 4.5
  },
  {
    id: 4,
    name: "Alexandre Petit",
    position: "PDG",
    company: "DataProtect",
    image: "/person4.svg", // fallback utilisé
    comment: "Nous avons fait appel à ses services pour un audit de sécurité complet de notre infrastructure. Son approche méthodique et ses recommandations claires nous ont permis d'améliorer significativement notre posture de sécurité. Un professionnel de confiance.",
    relation: "Client",
    socialLink: {
      type: "linkedin",
      url: "https://linkedin.com/"
    },
    rating: 5
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Générer des étoiles pour la notation
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-yellow-500" />);
    }

    return stars;
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const getSocialIcon = (type: string) => {
    switch (type) {
      case "linkedin":
        return <LinkedinIcon className="h-4 w-4" />;
      case "github":
        return <GithubIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getRelationColor = (relation: string) => {
    switch (relation) {
      case "Collègue":
        return "bg-blue-900 hover:bg-blue-800";
      case "Client":
        return "bg-green-900 hover:bg-green-800";
      case "Superviseur":
        return "bg-purple-900 hover:bg-purple-800";
      case "Partenaire":
        return "bg-yellow-900 hover:bg-yellow-800";
      default:
        return "bg-gray-900 hover:bg-gray-800";
    }
  };

  return (
    <section className="py-16 bg-[#0c0c0e]">
      <div className="gemini-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gemini-gradient-text">Recommandations</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Quelques témoignages de collègues et clients avec qui j'ai eu le plaisir de collaborer.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 px-4">
            <button
              onClick={prevTestimonial}
              className="bg-slate-800/80 p-2 rounded-full hover:bg-slate-700/80 backdrop-blur transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-slate-800/80 p-2 rounded-full hover:bg-slate-700/80 backdrop-blur transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="py-8">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="max-w-4xl mx-auto"
              >
                <Card className="bg-slate-800/50 backdrop-blur border-slate-700 shadow-lg">
                  <CardHeader className="pb-0">
                    <div className="flex items-start justify-between flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 border-2 border-blue-500/30">
                          <AvatarImage src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} />
                          <AvatarFallback className="bg-slate-700 text-blue-300">
                            {testimonials[activeIndex].name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-white text-xl mb-1">{testimonials[activeIndex].name}</CardTitle>
                          <CardDescription className="text-slate-300 flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                            <span>{testimonials[activeIndex].position}</span>
                            <span className="hidden md:inline">•</span>
                            <span className="font-semibold text-blue-400">{testimonials[activeIndex].company}</span>
                            {testimonials[activeIndex].socialLink && (
                              <a
                                href={testimonials[activeIndex].socialLink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                              >
                                {getSocialIcon(testimonials[activeIndex].socialLink.type)}
                              </a>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge className={`${getRelationColor(testimonials[activeIndex].relation)}`}>
                          {testimonials[activeIndex].relation}
                        </Badge>
                        <div className="flex">
                          {renderStars(testimonials[activeIndex].rating)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="relative">
                      <Quote className="absolute -top-4 -left-2 h-8 w-8 text-blue-500 opacity-30" />
                      <p className="text-slate-200 pl-6 leading-relaxed">{testimonials[activeIndex].comment}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between">
                    <div className="flex gap-1.5">
                      {testimonials.map((testimonial) => (
                        <button
                          key={testimonial.id}
                          className={`h-2 rounded-full transition-all ${
                            testimonial.id === testimonials[activeIndex].id ? "w-6 bg-blue-500" : "w-2 bg-slate-600"
                          }`}
                          onClick={() => {
                            const index = testimonials.findIndex(t => t.id === testimonial.id);
                            setDirection(index > activeIndex ? 1 : -1);
                            setActiveIndex(index);
                          }}
                          aria-label={`Témoignage ${testimonial.id}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">{activeIndex + 1} / {testimonials.length}</p>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
