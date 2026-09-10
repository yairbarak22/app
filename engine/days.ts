/** Local-time day index (days since 1970-01-01 in the learner's timezone). */
export function dayIndex(d: Date = new Date()): number {
  return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
}

export function dateString(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 0 = Sunday ... 6 = Saturday, derived from a day index (1970-01-01 was a Thursday = 4). */
export function weekday(day: number): number {
  return (((day + 4) % 7) + 7) % 7;
}
