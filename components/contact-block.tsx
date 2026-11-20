import { inlineLink, SectionHeader } from "@/components/blocks";
import { profile } from "@/lib/content";

export function ContactBlock() {
  return (
    <section className="mt-10">
      <SectionHeader label="get in touch" />
      <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        email me at{" "}
        <a href={`mailto:${profile.email}`} className={inlineLink}>
          {profile.email}
        </a>
      </p>
    </section>
  );
}
