import { SectionHeading } from "@/components/ui/section-heading";
import { hardSkills, softSkills } from "@/data/portfolio";

const groups = [
  {
    label: "Hard Skills",
    description:
      "Kemampuan teknis yang saya pakai untuk membangun produk, dari antarmuka sampai deployment.",
    items: hardSkills,
  },
  {
    label: "Soft Skills",
    description:
      "Cara saya bekerja saat mengerjakan proyek: menyusun prioritas, belajar cepat, dan menjaga komunikasi.",
    items: softSkills,
  },
];

export function SkillsSection() {
  return (
    <section
      className="section-pad"
      aria-label="Soft skill dan hard skill Haqqi AnnaZili"
    >
      <div className="content-wrap">
        <SectionHeading
          eyebrow="Skills"
          title="Hard skill untuk membangun, soft skill untuk berkolaborasi."
          description="Kombinasi kemampuan teknis dan interpersonal yang saya asah lewat proyek sekolah, proyek pribadi, dan course."
        />
        <div
          className="mt-10 grid gap-4 sm:grid-cols-2"
          data-scroll-reveal-stagger
        >
          {groups.map((group) => (
            <div
              className="card p-6 sm:p-7"
              key={group.label}
              data-scroll-reveal
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold">{group.label}</h3>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {group.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li className="skill-chip" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
