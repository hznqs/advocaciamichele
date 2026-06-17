"use client";

import Lenis from "lenis";
import { motion, useScroll } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  X,
  type LucideIcon
} from "lucide-react";
import CountUp from "react-countup";
import { useEffect, useMemo, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { ImageFallback } from "@/components/image-fallback";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  contentItems,
  credentials,
  differentiators,
  faq,
  institutionalMetrics,
  methodology,
  navItems,
  practiceAreas,
  publicCredentials,
  resultCases
} from "@/lib/landing-data";
import { siteConfig, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.18,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t))
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true
            }
          }
        );
      });

      gsap.to(".soft-parallax", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.3
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const mobileNav = useMemo(
    () =>
      navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="rounded-md px-4 py-3 font-sans text-sm font-medium text-white/78 transition hover:bg-white/[0.06] hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          {item.label}
        </a>
      )),
    []
  );

  return (
    <main className="relative isolate overflow-hidden bg-background text-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-gold to-transparent"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-[position:62%_center] bg-no-repeat sm:bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(7,17,31,0.68) 0%, rgba(7,17,31,0.84) 58%, rgba(7,17,31,0.94) 100%), linear-gradient(90deg, rgba(7,17,31,0.94) 0%, rgba(7,17,31,0.68) 48%, rgba(7,17,31,0.84) 100%), url(${siteConfig.images.office})`
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_24%,rgba(92,119,148,0.18),transparent_34rem)]"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          isScrolled
            ? "border-b border-white/10 bg-black/62 shadow-[0_18px_64px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            : "bg-transparent"
        )}
      >
        <nav className="container flex h-20 items-center justify-between sm:h-24 lg:h-28">
          <a href="#inicio" className="group flex min-w-0 items-center gap-3" aria-label={siteConfig.name}>
            <span className="relative flex h-16 w-36 shrink-0 items-center justify-center overflow-visible sm:h-20 sm:w-52 lg:h-24 lg:w-64">
              <ImageFallback
                src={siteConfig.images.logo}
                alt="Logo Michele Nogueira Morais"
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 208px, 256px"
                fill
                className="object-contain"
                fallbackClassName="h-16 w-36 sm:h-20 sm:w-52 lg:h-24 lg:w-64"
                fallbackLabel="MNM"
              />
            </span>
            <span className="hidden max-w-[13rem] font-sans text-[10px] font-medium uppercase leading-4 tracking-[0.22em] text-white/72 sm:block md:max-w-none">
              Advocacia e Consultoria
              <span className="block text-white/42">São Paulo / Brasil</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="premium-link font-sans text-sm font-medium text-white/62 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button asChild size="default" variant={isScrolled ? "default" : "outline"}>
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                Falar com a advogada
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white backdrop-blur-xl sm:h-11 sm:w-11 lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen ? (
          <div className="container pb-4 lg:hidden">
            <div className="glass-panel grid max-h-[calc(100vh-5rem)] gap-1 overflow-y-auto rounded-md p-2">
              {mobileNav}
              <Button asChild className="mt-2 w-full">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  Falar com a advogada
                </a>
              </Button>
            </div>
          </div>
        ) : null}
      </header>

      <section id="inicio" className="noise relative z-10 flex min-h-screen items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/18 to-background/72" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(92,119,148,0.18),transparent_32rem)]" />
        <div className="soft-parallax absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-gold/10 bg-gold/[0.045] blur-3xl" />

        <div className="container relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center pb-20 text-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-5 font-sans text-[11px] font-medium uppercase tracking-[0.34em] text-white/52"
            >
              OAB/SP 235.717 · Consultoria Jurídica Estratégica
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="max-w-[1320px] font-display text-[clamp(34px,7.4vw,112px)] font-bold leading-[0.92] tracking-[-0.055em] text-white"
            >
              <span className="block whitespace-nowrap">
                Advocacia <span className="text-gold">ESTRATÉGICA</span>
              </span>
              <span className="block whitespace-nowrap">para decisões de alto valor.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-3xl font-sans text-base font-normal leading-[1.8] text-white/68 sm:text-xl"
            >
              Um escritório jurídico em São Paulo para pessoas, profissionais e empresas que
              buscam orientação técnica, proteção de direitos e segurança antes de decisões
              relevantes.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  Iniciar atendimento
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <a
                href="#sobre"
                className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-white/62 transition hover:text-white"
              >
                Conhecer o escritório
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-background/35 py-6 backdrop-blur-[2px]">
        <div className="container">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {institutionalMetrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      </section>

      <Section
        id="sobre"
        eyebrow="Sobre o escritório"
        title="Excelência técnica com postura consultiva e visão estratégica."
        description="A Michele Nogueira Morais Advocacia e Consultoria Jurídica combina formação acadêmica sólida, atuação institucional e método de atendimento pensado para decisões jurídicas sensíveis."
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="gsap-reveal lg:col-span-5">
            <div className="relative mx-auto max-w-[440px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/8 to-transparent" />
              <ImageFallback
                src={siteConfig.images.attorney}
                alt="Dra. Michele Nogueira Morais"
                width={900}
                height={1100}
                className="aspect-[4/5] w-full object-cover object-top"
                fallbackClassName="aspect-[4/5] w-full"
                fallbackLabel="Foto profissional"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-white">
                  Dra. Michele Nogueira Morais
                </p>
                <p className="mt-2 font-sans text-xs font-medium uppercase tracking-[0.24em] text-gold/90">
                  Advocacia e Consultoria Jurídica
                </p>
              </div>
            </div>
          </div>

          <div className="gsap-reveal lg:col-span-7">
            <div className="grid gap-6">
              <div className="rounded-lg border border-gold/16 bg-gold/[0.035] p-6 sm:p-8 lg:p-10">
                <Quote className="h-9 w-9 text-gold/75" />
                <h3 className="mt-6 max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl">
                  Direito tratado como estratégia, não como improviso.
                </h3>
                <p className="mt-5 max-w-3xl font-sans text-base leading-[1.8] text-white/66 sm:text-lg">
                  A atuação prioriza clareza, documentação, análise de risco e condução técnica.
                  O cliente entende o cenário, os caminhos possíveis e o próximo movimento antes
                  da execução.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {credentials.map((credential, index) => (
                  <div
                    key={credential}
                    className="rounded-md border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:border-gold/30 hover:bg-white/[0.045]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h4 className="mt-1 font-display text-base font-semibold tracking-[-0.02em] text-white">
                          {credential}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="areas"
        eyebrow="Áreas de atuação"
        title="Soluções jurídicas para direitos, patrimônio, trabalho e planejamento."
        description="A atuação é desenhada para organizar riscos, proteger interesses e orientar decisões com linguagem clara, precisão técnica e visão de longo prazo."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {practiceAreas.map((area) => (
            <Card
              key={area.title}
              className="gsap-reveal group relative overflow-hidden border-white/10 bg-white/[0.028] transition duration-500 hover:-translate-y-1 hover:border-gold/34 hover:bg-white/[0.045]"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gold-line opacity-0 transition duration-500 group-hover:opacity-100" />
              <CardContent className="p-6 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-md border border-gold/20 bg-gold/[0.08] text-gold">
                  <area.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold leading-[1.05] tracking-[-0.035em] text-white">
                  {area.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-[1.8] text-white/58 sm:text-base">
                  {area.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="metodologia"
        eyebrow="Metodologia"
        title="Um método jurídico pensado para reduzir incerteza."
        description="A condução do caso acontece em camadas: contexto, diagnóstico, estratégia, execução e governança. Isso cria previsibilidade e evita decisões apressadas."
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="gsap-reveal lg:col-span-4">
            <div className="sticky top-32 rounded-lg border border-gold/16 bg-gold/[0.035] p-6 sm:p-8">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-gold/85">
                Estratégia antes da execução
              </p>
              <h3 className="mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                Cada etapa existe para proteger a decisão.
              </h3>
              <p className="mt-5 font-sans text-sm leading-[1.8] text-white/58">
                O processo de atendimento privilegia ordem, profundidade e clareza. Pouco ruído,
                muita leitura técnica.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative">
              <div className="absolute left-[1.42rem] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent md:block" />
              <div className="grid gap-4">
                {methodology.map((step, index) => (
                  <div
                    key={step.title}
                    className="gsap-reveal relative grid gap-5 rounded-lg border border-white/10 bg-white/[0.028] p-5 md:grid-cols-[4.5rem_1fr] md:p-7"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-background text-sm font-semibold text-gold shadow-[0_0_0_8px_rgba(7,17,31,0.9)]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold leading-[1.05] tracking-[-0.035em] text-white">
                        {step.title}
                      </h3>
                      <p className="mt-3 font-sans text-sm leading-[1.8] text-white/58 sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="diferenciais"
        eyebrow="Diferenciais"
        title="Uma experiência jurídica sóbria, precisa e orientada por evidências."
        description="O padrão premium aparece na clareza da análise, na qualidade da comunicação e na forma como cada decisão é estruturada."
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="gsap-reveal rounded-lg border border-gold/16 bg-gold/[0.04] p-7 sm:p-9 lg:col-span-5">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-gold/85">
              Alto valor percebido
            </p>
            <h3 className="mt-5 font-display text-4xl font-semibold leading-[1] tracking-[-0.05em] text-white sm:text-5xl">
              Menos promessa. Mais método, prova e estratégia.
            </h3>
            <p className="mt-6 font-sans text-base leading-[1.8] text-white/62">
              Uma marca jurídica premium não depende de exageros visuais. Ela se sustenta por
              consistência, credenciais, postura e leitura técnica.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {differentiators.slice(0, 6).map((item) => (
              <div
                key={item.title}
                className="gsap-reveal rounded-lg border border-white/10 bg-white/[0.028] p-5 transition duration-300 hover:-translate-y-1 hover:border-gold/28 hover:bg-white/[0.045]"
              >
                <item.icon className="h-5 w-5 text-gold" />
                <h4 className="mt-5 font-display text-xl font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </h4>
                <p className="mt-3 font-sans text-sm leading-[1.8] text-white/56">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section id="resultados" className="relative z-10 overflow-hidden border-y border-white/10 py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(92,119,148,0.16),transparent_34rem)]" />
        <div className="container relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="gsap-reveal lg:col-span-7">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-gold">
                Casos, resultados e reconhecimento
              </p>
              <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl">
                Autoridade institucional com registros públicos e entregáveis concretos.
              </h2>
            </div>
            <p className="gsap-reveal font-sans text-base leading-[1.8] text-white/58 lg:col-span-5">
              Em vez de promessas genéricas, o escritório apresenta fundamentos verificáveis:
              inscrição profissional, sociedade ativa, produção jurídica e um método de trabalho
              orientado por documentos.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {resultCases.map((item) => (
              <div key={item.title} className="gsap-reveal rounded-lg border border-white/10 bg-white/[0.028] p-6 sm:p-7">
                <h3 className="font-display text-2xl font-semibold leading-[1.05] tracking-[-0.035em] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-[1.8] text-white/56 sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="gsap-reveal mt-10">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4200, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
              spaceBetween={18}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1180: { slidesPerView: 3 }
              }}
              className="!pb-12"
            >
              {publicCredentials.map((credential) => (
                <SwiperSlide key={credential.title} className="h-auto">
                  <Card className="h-full border-white/10 bg-white/[0.028]">
                    <CardContent className="flex h-full flex-col p-6">
                      <credential.icon className="h-6 w-6 text-gold" />
                      <h3 className="mt-6 font-display text-2xl font-semibold leading-[1.05] tracking-[-0.035em] text-white">
                        {credential.title}
                      </h3>
                      <p className="mt-3 font-sans text-xs font-medium uppercase tracking-[0.22em] text-gold/78">
                        {credential.source}
                      </p>
                      <p className="mt-5 flex-1 font-sans text-sm leading-[1.8] text-white/56">
                        {credential.text}
                      </p>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <Section
        id="conteudos"
        eyebrow="Conteúdos"
        title="Leituras jurídicas para decisões mais inteligentes."
        description="Conteúdos institucionais com foco em prevenção, organização documental e estratégia para clientes que valorizam clareza antes da ação."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {contentItems.map((item) => (
            <article
              key={item.title}
              className="gsap-reveal group rounded-lg border border-white/10 bg-white/[0.028] p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/28 hover:bg-white/[0.045] sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <item.icon className="h-5 w-5 text-gold" />
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white/38">
                  {item.category}
                </span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-semibold leading-[1.05] tracking-[-0.035em] text-white">
                {item.title}
              </h3>
              <p className="mt-4 font-sans text-sm leading-[1.8] text-white/56 sm:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="contato"
        eyebrow="Contato"
        title="Seu caso merece uma leitura técnica antes do próximo passo."
        description="Entre em contato para uma triagem inicial. A equipe indicará quais documentos são necessários e como organizar a análise jurídica."
      >
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="gsap-reveal rounded-lg border border-gold/18 bg-gold/[0.04] p-6 sm:p-9 lg:col-span-7">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-gold/85">
              Atendimento institucional
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl">
              Fale com a advocacia e organize sua estratégia.
            </h2>
            <p className="mt-6 max-w-2xl font-sans text-base leading-[1.8] text-white/62">
              O primeiro contato direciona a análise do caso e evita desperdício de tempo com
              documentos incompletos, prazos esquecidos ou decisões tomadas sem contexto.
            </p>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:gap-7">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  Falar com a advogada
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <a href={`mailto:${siteConfig.email}`}>Enviar e-mail</a>
              </Button>
            </div>
          </div>

          <div className="gsap-reveal grid gap-4 lg:col-span-5">
            <ContactItem icon={Phone} label="WhatsApp" value={siteConfig.displayPhone} href={whatsappHref} />
            <ContactItem icon={Mail} label="E-mail" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <ContactItem
              icon={MapPin}
              label="Atendimento"
              value="Itaquera, São Paulo e online"
              href="#inicio"
            />
          </div>
        </div>

        <div className="gsap-reveal mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-gold">FAQ</p>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-white">
              Perguntas frequentes
            </h3>
            <p className="mt-4 font-sans text-sm leading-[1.8] text-white/56">
              Respostas rápidas para orientar o primeiro contato e preparar a análise inicial.
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-lg border border-white/10 px-4 sm:px-6 lg:col-span-8">
            {faq.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <footer className="relative z-10 border-t border-white/10 py-10 sm:py-12">
        <div className="container grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl font-semibold tracking-[-0.035em] text-white">
              Michele Nogueira Morais
            </p>
            <p className="mt-2 font-sans text-sm leading-[1.8] text-white/52">
              Advocacia e Consultoria Jurídica · OAB/SP 235.717
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:col-span-5">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="premium-link font-sans text-sm font-medium text-white/50 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
          <p className="font-sans text-sm leading-[1.8] text-white/38 lg:col-span-2 lg:text-right">
            São Paulo, Brasil
          </p>
        </div>
      </footer>
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container">
        <div className="gsap-reveal mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
            <h2 className="text-balance mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl">
              {title}
            </h2>
          </div>
          <p className="font-sans text-base leading-[1.8] text-white/58 lg:col-span-5">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function MetricCard({
  metric
}: {
  metric: (typeof institutionalMetrics)[number];
}) {
  const hasNumericValue = "value" in metric && typeof metric.value === "number";
  const prefix = "prefix" in metric ? metric.prefix : undefined;

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.026] p-5">
      <p className="font-sans text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
        {hasNumericValue ? (
          <>
            {prefix}
            <CountUp end={metric.value} duration={2.1} separator="." enableScrollSpy scrollSpyOnce />
          </>
        ) : (
          metric.text
        )}
      </p>
      <p className="mt-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold/82">{metric.label}</p>
      <p className="mt-3 font-sans text-sm leading-[1.7] text-white/46">{metric.description}</p>
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group rounded-lg border border-white/10 bg-white/[0.028] p-5 transition duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/[0.045]"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-md border border-gold/20 bg-gold/[0.08] text-gold">
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block font-sans text-xs font-medium uppercase tracking-[0.2em] text-white/40">{label}</span>
          <span className="mt-1 block break-words font-sans font-semibold text-white transition group-hover:text-gold">
            {value}
          </span>
        </span>
      </div>
    </a>
  );
}
