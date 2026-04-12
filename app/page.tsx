import Link from "next/link";
import Image from "next/image";
import NewsCard from "@/components/NewsCard";
import AppointmentCard from "@/components/AppointmentCard";
import { HeroSection } from "@/components/HeroSection";
import { MotionFadeIn, StaggerGrid } from "@/components/AnimatedNewsSection";
import { InstagramSection } from "@/components/InstagramSection";
import SchuetzenfestCountdown from "@/components/SchuetzenfestCountdown";
import { getLatestNews, getUpcomingAppointments, getHofstaatEintraege, getSchuetzenStatics } from "@/lib/directus/queries";
import { getInstagramMedia } from "@/lib/instagram";
import { NEXT_SCHUETZENFEST_DATE } from "@/lib/site";
import { getGalleryImages, getCloudinaryImageUrl } from "@/lib/cloudinary";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "St. Sebastianus Schützenbruderschaft Büderich von 1567 e.V.",
  description: "Herzlich willkommen bei der St. Sebastianus Schützenbruderschaft Meerbusch-Büderich 1567 e.V.",
};

export default async function HomePage() {
  const [news, upcomingAppointments, instagramPosts, heroRawImages, hofstaat, statics] = await Promise.all([
    getLatestNews(3),
    getUpcomingAppointments(3),
    getInstagramMedia(6),
    getGalleryImages("hero", 5), // Weniger Bilder = weniger Ladezeit, 5 reicht für Slider
    getHofstaatEintraege(),
    getSchuetzenStatics().catch(() => null),
  ]);

  const koenigspaar = hofstaat.find((e) => e.kategorie === "koenigspaar") ?? null;
  const nextFestivalDate = statics?.nextFestival ?? NEXT_SCHUETZENFEST_DATE;

  const heroImages = heroRawImages.map((img) =>
    getCloudinaryImageUrl(img.public_id, {
      width: 1920, // Ausreichend für Full-HD, spart Datenvolumen
      crop: "fill",
    })
  );

  return (
    <>
      {/* ── HERO: Vollbild, Glas-Header, Parallax & Scroll-Animation ── */}
      <HeroSection
        imageSrc={heroImages[0] ?? "/images/hero_image_opt.jpg"}
        imageSrcs={heroImages.length > 0 ? heroImages : undefined}
        title="Herzlich Willkommen"
        subtitle="bei den Büdericher Schützen"
        infoText="Wir sind ein Teil der St. Sebastianus-Schützenbruderschaft in Deutschland, Büderich 1567 e.V. Tradition, Gemeinschaft und Freude – das ist unser Motto!"
        countdownSlot={
          <SchuetzenfestCountdown
            targetDate={nextFestivalDate}
            title="Nächstes Schützenfest"
            variant="glass"
          />
        }
      />

      {/* ── AKTUELLER KÖNIG ── */}
      {koenigspaar && (
        <section className={`section ${styles.koenigSection}`}>
          <div className="container">
            <MotionFadeIn>
              <div className={styles.koenigCard}>
                <div className={styles.koenigImageWrap}>
                  <Image
                    src={koenigspaar.imageUrl}
                    alt={koenigspaar.titel}
                    fill
                    sizes="(max-width: 760px) 100vw, 380px"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
                <div className={styles.koenigBody}>
                  <div className={styles.koenigBadge}>Amtierendes Königspaar</div>
                  <h2 className={styles.koenigTitle}>{koenigspaar.titel}</h2>
                  <p className={styles.koenigText}>
                    Lernen Sie unser amtierendes Königspaar und den gesamten Hofstaat kennen.
                  </p>
                  <Link href="/aktueller-hofstaat" className={styles.koenigCta}>
                    Zum Hofstaat →
                  </Link>
                </div>
              </div>
            </MotionFadeIn>
          </div>
        </section>
      )}

      {/* ── NEWS + INSTAGRAM ── */}
      <section id="news" className={`section ${styles.newsSection}`}>
        <div className="container">
          <div className={styles.newsFacebookGrid}>

            {/* News – mit Motion wie Instagram-Section */}
            <div>
              <MotionFadeIn>
                <h2 className="section-title">Neuigkeiten aus unserer Bruderschaft</h2>
                <p className="section-subtitle">Bleiben Sie informiert über alle wichtigen Ereignisse und Neuigkeiten</p>
              </MotionFadeIn>
              {news.length > 0 ? (
                <>
                  <StaggerGrid className={styles.newsGrid}>
                    {news.map((article) => (
                      <NewsCard key={article.id} article={article} />
                    ))}
                  </StaggerGrid>
                  <MotionFadeIn delay={0.2}>
                    <div className={styles.newsCtaWrap}>
                      <Link href="/news" className={styles.newsCtaBtn}>Alle Beiträge ansehen →</Link>
                    </div>
                  </MotionFadeIn>
                </>
              ) : (
                <MotionFadeIn>
                  <p style={{ color: "var(--text-muted)" }}>
                    Noch keine Beiträge vorhanden. Inhalte können im{" "}
                    <Link href="/studio" style={{ color: "var(--green-light)", fontWeight: 600 }}>
                      CMS unter /studio
                    </Link>{" "}
                    angelegt werden.
                  </p>
                </MotionFadeIn>
              )}
            </div>
          </div>
        </div>
      </section>



                    {/* ── TERMINE ── */}
      <section id="termine" className={`section ${styles.newsSection}`}>
        <div className="container">
          <div className={styles.termineWrap}>
            <div>
              <MotionFadeIn>
                <h2 className={`section-title ${styles.sectionTitleTermine}`}>Termine & Veranstaltungen</h2>
                <p className={`section-subtitle ${styles.sectionSubtitleTermine}`}>
                  Kommende Events und Anlässe der Bruderschaft
                </p>
              </MotionFadeIn>
              {upcomingAppointments.length > 0 ? (
                <>
                  <StaggerGrid className={styles.appointmentsList}>
                    {upcomingAppointments.map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        variant="list"
                      />
                    ))}
                  </StaggerGrid>
                  <MotionFadeIn delay={0.2}>
                    <div className={styles.newsCtaWrap}>
                      <Link href="/veranstaltungen" className={styles.newsCtaBtn}>
                        Alle Veranstaltungen →
                      </Link>
                    </div>
                  </MotionFadeIn>
                </>
              ) : (
                <MotionFadeIn>
                  <p style={{ color: "var(--text-muted)" }}>
                    Derzeit sind keine Termine eingetragen. Neue Termine können
                    im{" "}
                    <Link
                      href="/studio"
                      style={{ color: "var(--green-light)", fontWeight: 600 }}
                    >
                      CMS unter /studio
                    </Link>{" "}
                    angelegt werden.
                  </p>
                </MotionFadeIn>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM (Design wie Screenshot) ── */}
      <InstagramSection posts={instagramPosts} />

    </>
  );
}
