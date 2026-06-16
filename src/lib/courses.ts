export type Course = { title: string; level?: string };
export type Category = {
  slug: string;
  name: string;
  blurb: string;
  groups: { name: string; courses: Course[] }[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "igcse",
    name: "IGCSE Programs",
    blurb:
      "Cambridge IGCSE tuition across sciences, languages, humanities and business — taught by examiners.",
    groups: [
      {
        name: "Core Subjects",
        courses: [
          { title: "Mathematics" },
          { title: "Additional Mathematics" },
          { title: "English Language" },
          { title: "English Literature" },
          { title: "Kiswahili" },
        ],
      },
      {
        name: "Sciences",
        courses: [
          { title: "Biology" },
          { title: "Chemistry" },
          { title: "Physics" },
          { title: "Combined Science" },
          { title: "Environmental Management" },
        ],
      },
      {
        name: "Humanities & Business",
        courses: [
          { title: "Geography" },
          { title: "History" },
          { title: "Business Studies" },
          { title: "Accounting" },
          { title: "Economics" },
          { title: "Global Perspectives" },
        ],
      },
      {
        name: "Technology",
        courses: [{ title: "Computer Science" }, { title: "ICT" }],
      },
    ],
  },
  {
    slug: "cbc",
    name: "CBC & National Curriculum",
    blurb:
      "End-to-end Kenyan curriculum tuition from primary through KCSE, with structured holiday programs.",
    groups: [
      {
        name: "Tuition Streams",
        courses: [
          { title: "Primary School Tuition" },
          { title: "Junior Secondary Tuition" },
          { title: "Senior Secondary Tuition" },
          { title: "KCSE Revision" },
          { title: "Holiday Tuition Programs" },
        ],
      },
    ],
  },
  {
    slug: "computer-packages",
    name: "Computer Packages",
    blurb:
      "Practical office productivity training — perfect for school, university and the workplace.",
    groups: [
      {
        name: "Microsoft Office Suite",
        courses: [
          { title: "Microsoft Word" },
          { title: "Microsoft Excel" },
          { title: "Microsoft PowerPoint" },
          { title: "Microsoft Access" },
          { title: "Internet & Email" },
        ],
      },
    ],
  },
  {
    slug: "networking",
    name: "Networking & Cybersecurity",
    blurb:
      "Industry-aligned networking and security training, from CCNA prep to ethical hacking foundations.",
    groups: [
      {
        name: "Programs",
        courses: [
          { title: "Computer Networking" },
          { title: "Cisco CCNA Preparation" },
          { title: "Network Administration" },
          { title: "Cybersecurity Essentials" },
          { title: "Ethical Hacking Fundamentals" },
        ],
      },
    ],
  },
  {
    slug: "design",
    name: "Graphic Design & Media",
    blurb:
      "Master Adobe Creative Cloud, motion graphics and social-first content creation.",
    groups: [
      {
        name: "Adobe Creative Suite",
        courses: [
          { title: "Adobe Photoshop" },
          { title: "Adobe Illustrator" },
          { title: "Adobe InDesign" },
          { title: "Premiere Pro" },
          { title: "After Effects" },
        ],
      },
      {
        name: "Modern Media",
        courses: [
          { title: "Canva Design" },
          { title: "Motion Graphics" },
          { title: "Social Media Content Creation" },
        ],
      },
    ],
  },
  {
    slug: "accounting",
    name: "Accounting & Business",
    blurb:
      "Build the finance and entrepreneurship skills that employers and founders need today.",
    groups: [
      {
        name: "Courses",
        courses: [
          { title: "QuickBooks Accounting" },
          { title: "Bookkeeping" },
          { title: "Payroll Management" },
          { title: "Financial Accounting" },
          { title: "Entrepreneurship" },
          { title: "Business Management" },
        ],
      },
    ],
  },
  {
    slug: "programming",
    name: "Programming & Development",
    blurb:
      "From your first line of HTML to deploying full-stack web and mobile apps.",
    groups: [
      {
        name: "Web & Languages",
        courses: [
          { title: "HTML" },
          { title: "CSS" },
          { title: "JavaScript" },
          { title: "Python" },
          { title: "Web Development" },
        ],
      },
      {
        name: "Data & Apps",
        courses: [
          { title: "Database Management" },
          { title: "Mobile App Development" },
        ],
      },
    ],
  },
];

export const FEATURED = [
  { category: "igcse", title: "IGCSE Mathematics", tag: "Cambridge", duration: "24 weeks" },
  { category: "programming", title: "Full-Stack Web Development", tag: "Career Track", duration: "16 weeks" },
  { category: "design", title: "Adobe Creative Suite", tag: "Design", duration: "12 weeks" },
  { category: "networking", title: "Cisco CCNA Preparation", tag: "Certification", duration: "14 weeks" },
  { category: "accounting", title: "QuickBooks Accounting", tag: "Finance", duration: "8 weeks" },
  { category: "cbc", title: "KCSE Revision Intensive", tag: "Exam Prep", duration: "10 weeks" },
];
