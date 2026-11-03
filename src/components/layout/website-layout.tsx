import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsappButton } from "@/components/layout/floating-whatsapp-button";
import { Navbar } from "@/components/layout/navbar";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export async function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-heading">
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <SiteFooter />
      <FloatingWhatsappButton />
    </div>
  );
}
