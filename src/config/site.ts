export const siteConfig = {
  brandName: "OA",
  name: "Omran",
  arabicName: "عمران",
  legalName: "Omran — Software Developer",
  tagline: "Software Developer",
  role: "Software Developer",
  siteUrl: "https://omran.dev",
  contactEmail: "om.alrbedan100@gmail.com",
  phone: "+963988638009",
  githubUrl: "https://github.com/omran",
  linkedinUrl: "https://www.linkedin.com/in/omran",
  twitterUrl: "https://x.com/omran",
  location: "Damascus, Syria",
  city: "Damascus",
  country: "Syria",
  description:
    "OA is the personal brand of Omran, a software developer based in Damascus, Syria, building web apps, APIs, and digital products.",
  arabicDescription:
    "OA هي الهوية الشخصية لعمران، مطوّر برمجيات مقيم في دمشق، سوريا، يبني تطبيقات الويب والواجهات البرمجية والمنتجات الرقمية.",
  localeCookie: "omran-locale",
  locales: ["en"] as const,
  defaultLocale: "en" as const,
};

export type SiteLocale = (typeof siteConfig.locales)[number];
