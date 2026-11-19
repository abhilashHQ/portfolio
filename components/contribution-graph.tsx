import type { Contributions, Week } from "@/lib/github";

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function monthLabels(weeks: Week[]) {
  const labels: { month: string; index: number }[] = [];
  let last = -1;
  weeks.forEach((week, index) => {
    if (week.contributionDays.length > 0) {
      const month = new Date(`${week.contributionDays[0].date}T00:00:00Z`).getUTCMonth();
      if (month !== last) {
        labels.push({ month: MONTHS[month], index });
        last = month;
      }
    }
  });
  return labels;
}

export function ContributionGraph({ data, username }: { data: Contributions | null; username: string }) {
  const heading = (
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">contribution activity</h3>
      {data && (
        <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          {data.total.toLocaleString("en")} contributions in the last year
        </p>
      )}
    </div>
  );

  if (!data) {
    return (
      <section className="w-full">
        {heading}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
        >
          see activity on github ↗
        </a>
      </section>
    );
  }

  const months = monthLabels(data.weeks);

  return (
    <section className="w-full">
      {heading}
      <div className="overflow-x-auto pb-1">
        <div className="min-w-[700px]">
          <div className="mb-2 ml-8 flex justify-between pr-1 text-[10px] text-zinc-400 dark:text-zinc-500">
            {months.map(({ month, index }) => (
              <span key={`${month}-${index}`}>{month}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="grid grid-rows-7 gap-[3px] pt-px text-right text-[10px] leading-[11px] text-zinc-400 dark:text-zinc-500">
              <span />
              <span>mon</span>
              <span />
              <span>wed</span>
              <span />
              <span>fri</span>
              <span />
            </div>
            <div className="flex gap-[3px]">
              {data.weeks.map((week, i) => (
                <div key={i} className={`flex flex-col gap-[3px] ${i === 0 ? "justify-end" : ""}`}>
                  {week.contributionDays.map((day) => (
                    <div
                      key={day.date}
                      className={`size-[11px] rounded-[3px] transition-transform duration-150 hover:scale-125 contribution-level-${day.level}`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
