import { profile } from "@/lib/content";

export function ContactBlock() {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">get in touch</h2>
      <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        email me at{" "}
        <a
          href={`mailto:${profile.email}`}
          className="text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900"
        >
          {profile.email}
        </a>
      </p>
    </section>
  );
}
