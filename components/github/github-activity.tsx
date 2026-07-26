import type { CSSProperties } from "react";
import { profile } from "@/data/portfolio";

type ContributionDay = {
  date: string;
  level: number;
};

type GitHubActivityData = {
  days: ContributionDay[];
  total: number | null;
};

const monthFormatter = new Intl.DateTimeFormat("id-ID", {
  month: "short",
  timeZone: "UTC",
});

function readAttribute(tag: string, attribute: string) {
  return tag.match(new RegExp(`${attribute}="([^"]+)"`))?.[1];
}

async function getGitHubActivity(): Promise<GitHubActivityData> {
  try {
    const response = await fetch(
      "https://github.com/users/zyilzzz77/contributions",
      {
        headers: {
          Accept: "text/html",
          "User-Agent": "Haqqi-Portfolio",
        },
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    const html = await response.text();
    const totalMatch = html.match(
      /([\d,.]+)\s+contributions?\s+in\s+the\s+last\s+year/i,
    );
    const contributionTags =
      html.match(/<(?:td|rect)\b[^>]*data-date="[^"]+"[^>]*>/g) ?? [];

    const days = contributionTags
      .map((tag) => {
        const date = readAttribute(tag, "data-date");
        const level = Number(readAttribute(tag, "data-level") ?? 0);
        return date ? { date, level: Math.min(Math.max(level, 0), 4) } : null;
      })
      .filter((day): day is ContributionDay => day !== null)
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      days,
      total: totalMatch
        ? Number(totalMatch[1].replace(/[,.]/g, ""))
        : null,
    };
  } catch {
    return { days: [], total: null };
  }
}

function getMonthLabels(days: ContributionDay[]) {
  const labels: Array<{ column: number; label: string }> = [];
  let previousMonth = -1;

  days.forEach((day, index) => {
    const date = new Date(`${day.date}T00:00:00Z`);
    const month = date.getUTCMonth();

    if (month !== previousMonth) {
      labels.push({
        column: Math.floor(index / 7) + 1,
        label: monthFormatter.format(date),
      });
      previousMonth = month;
    }
  });

  if (
    labels.length > 1 &&
    labels[1].column - labels[0].column < 3
  ) {
    labels.shift();
  }

  return labels;
}

export async function GitHubActivity() {
  const activity = await getGitHubActivity();
  const weekCount = Math.max(Math.ceil(activity.days.length / 7), 53);
  const months = getMonthLabels(activity.days);
  const graphStyle = {
    "--github-weeks": weekCount,
  } as CSSProperties;

  return (
    <section className="section-pad pb-16">
      <div className="github-wrap">
        <div data-scroll-reveal>
          <h2 className="text-4xl font-semibold tracking-[-0.045em]">
            GitHub Activity
          </h2>
          <p className="mt-2 text-lg text-[var(--muted)]">
            {profile.github.handle.replace("@", "")}&apos;s coding journey over
            the past year
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--soft)]">
            {activity.total === null
              ? "Aktivitas sedang dimuat dari GitHub"
              : `Total: ${activity.total.toLocaleString("en-US")} contributions`}
          </p>
        </div>

        <a
          href={profile.github.url}
          target="_blank"
          rel="noreferrer"
          className="github-panel mt-10 block"
          data-scroll-reveal
          aria-label={`Buka profil GitHub ${profile.github.handle}`}
        >
          {activity.days.length > 0 ? (
            <div className="github-scroll">
              <div className="github-graph" style={graphStyle}>
                <div className="github-months">
                  {months.map((month, index) => (
                    <span
                      key={`${month.label}-${month.column}-${index}`}
                      style={{ gridColumnStart: month.column }}
                    >
                      {month.label}
                    </span>
                  ))}
                </div>
                <div className="github-days">
                  {activity.days.map((day) => (
                    <span
                      key={day.date}
                      className={`github-day github-level-${day.level}`}
                      title={`${day.date} - level ${day.level}`}
                    />
                  ))}
                </div>
                <div className="github-legend">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
                      className={`github-day github-level-${level}`}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-48 items-center justify-center text-sm text-[var(--muted)]">
              Data kontribusi GitHub akan muncul otomatis saat koneksi tersedia.
            </div>
          )}
        </a>
      </div>
    </section>
  );
}
