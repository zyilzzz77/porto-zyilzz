import { SectionHeading } from "@/components/ui/section-heading";
import { hardSkills, softSkills } from "@/data/portfolio";

const hardSkillGroups = [
  {
    label: "Membangun produk",
    items: [
      "Web Development",
      "Frontend Development",
      "Backend & API",
      "TypeScript & JavaScript",
    ],
  },
  {
    label: "Merawat sistem",
    items: [
      "IT Support",
      "Computer Networking",
      "Cisco IOS & Packet Tracer",
      "Linux Server (Debian)",
      "Cloud & Deployment",
      "Automation",
    ],
  },
  {
    label: "Data & AI",
    items: [
      "Python",
      "Database (SQL & NoSQL)",
      "Machine Learning",
      "Generative AI",
    ],
  },
];

const listedSkills = new Set(
  hardSkillGroups.flatMap((group) => group.items),
);
const unlistedSkills = hardSkills.filter((skill) => !listedSkills.has(skill));
const groups = unlistedSkills.length
  ? [...hardSkillGroups, { label: "Lainnya", items: unlistedSkills }]
  : hardSkillGroups;

export function SkillsSection() {
  return (
    <section
      className="section-pad"
      aria-label="Soft skill dan hard skill Haqqi AnnaZili"
    >
      <div className="content-wrap">
        <SectionHeading
          eyebrow="Keahlian"
          title="Kemampuan teknis dan cara saya bekerja."
          description="Kemampuan teknis saya asah melalui proyek sekolah dan proyek pribadi. Kemampuan interpersonal saya latih saat mengerjakan keduanya dalam tim."
        />

        <div className="skills-sheet" data-scroll-reveal>
          <div className="skills-block">
            <div className="skills-block-head">
              <h3 className="skills-block-title">Hard skill</h3>
              <span className="skills-block-count">
                {String(hardSkills.length).padStart(2, "0")}
              </span>
            </div>
            <p className="skills-block-note">
              Kemampuan teknis yang saya gunakan untuk membangun produk, dari
              antarmuka hingga deployment.
            </p>

            <div className="skills-groups">
              {groups.map((group) => (
                <div className="skills-group" key={group.label}>
                  <h4 className="skills-group-label">{group.label}</h4>
                  <ul className="skills-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-block skills-block-soft">
            <div className="skills-block-head">
              <h3 className="skills-block-title">Soft skill</h3>
              <span className="skills-block-count">
                {String(softSkills.length).padStart(2, "0")}
              </span>
            </div>
            <p className="skills-block-note">
              Cara saya bekerja saat mengerjakan proyek: menyusun prioritas,
              belajar dengan cepat, dan menjaga komunikasi.
            </p>

            <ul className="skills-list skills-list-soft">
              {softSkills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
