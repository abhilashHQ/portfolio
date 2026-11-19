export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string | null;
  readingMinutes: number;
};

const longDate = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" });

export function formatDate(iso: string) {
  return longDate.format(new Date(`${iso}T00:00:00`));
}
