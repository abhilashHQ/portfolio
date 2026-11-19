export type Day = { date: string; count: number; level: number };
export type Week = { contributionDays: Day[] };
export type Contributions = { total: number; weeks: Week[] };

export async function getContributions(username: string): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!res.ok) return null;
    const data: { total: Record<string, number>; contributions: Day[] } = await res.json();

    const weeks: Week[] = [];
    let current: Day[] = [];
    for (const day of data.contributions) {
      if (new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0 && current.length) {
        weeks.push({ contributionDays: current });
        current = [];
      }
      current.push(day);
    }
    if (current.length) weeks.push({ contributionDays: current });

    return { total: data.total.lastYear ?? 0, weeks };
  } catch {
    return null;
  }
}
