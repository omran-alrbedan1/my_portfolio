type SeoMessages = {
  classification: string;
  ogImageAlt: string;
  keywords: {
    default: string[];
    routes: Record<string, string[]>;
  };
  schema: {
    websiteDescription: string;
    personDescription: string;
  };
};

type CommonMessages = {
  seo: SeoMessages;
};

export async function getSeoMessages(): Promise<SeoMessages> {
  const messages = (await import("@/messages/en/common.json"))
    .default as CommonMessages;

  return messages.seo;
}
