"use client";

import Image from "next/image";
import config from "~/config";
import { cn } from "~/lib/utils";
import { typo } from "./ui/typograpghy";
import codingImage from "~/assets/images/coding.png";
import BlurText from "~/components/ui/blur-text";

const para = cn(
  typo({ variant: "paragraph", font: "sans" }),
  "text-[17px] leading-7"
);

const AboutSection = () => {
  return (
    <section className="grid gap-8 sm:gap-4 md:grid-cols-3" aria-label="About">
      <div className="order-2 space-y-3 sm:order-1 md:col-span-2">
        <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          <BlurText text="Abhilash, 20" />
        </h1>

        <p className={para}>
          I build AI agents and the backends that keep them running, from a
          rough prompt loop to something people use every day.
        </p>

        <p className={para}>
          I&apos;ve built a coding agent harness from scratch, a voice assistant
          for the Mac notch, and cited search over 512K documents. Mostly Python.
        </p>

        <p className={para}>
          Off the keyboard I follow the markets, read, and watch too many
          movies.
        </p>

        <p className={cn(para, "sm:!mt-4")}>
          <span className="text-foreground font-medium">Open to work</span>:
          full-time remote roles in applied AI and backend engineering.{" "}
          <a
            href={`mailto:${config.social.email}`}
            className="el-focus-styles text-ring underline"
          >
            Let&apos;s talk.
          </a>
        </p>
      </div>

      <div className="relative order-1 block aspect-square sm:order-2 sm:hidden md:block md:self-center">
        <Image
          id="about-photo"
          alt="Locked In"
          src={codingImage}
          placeholder="blur"
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="rounded-md object-cover shadow-md dark:brightness-90 dark:contrast-125 dark:grayscale dark:saturate-0"
          priority
        />
      </div>
    </section>
  );
};

export default AboutSection;