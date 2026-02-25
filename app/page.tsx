import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { HeroSection } from "@/components/HeroSection";
import { MotionFadeIn, StaggerGrid } from "@/components/AnimatedNewsSection";
import { InstagramSection } from "@/components/InstagramSection";
import SchuetzenfestCountdown from "@/components/SchuetzenfestCountdown";
import { getLatestNews } from "@/lib/sanity/queries";
import { getInstagramMedia } from "@/lib/instagram";
import { NEXT_SCHUETZENFEST_DATE } from "@/lib/site";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "St. Sebastianus Schützenbruderschaft Büderich von 1567 e.V.",
  description: "Herzlich willkommen bei der St. Sebastianus Schützenbruderschaft Meerbusch-Büderich 1567 e.V.",
};

export default async function HomePage() {
  const [news, instagramPosts] = await Promise.all([
    getLatestNews(3),
    getInstagramMedia(6),
  ]);

  return (
    <>
      {/* ── HERO: Vollbild, Glas-Header, Parallax & Scroll-Animation ── */}
      <HeroSection
        imageSrc="/images/hero_image_opt.jpg"
        title="Herzlich Willkommen"
        subtitle="bei den Büdericher Schützen"
        infoText="Wir sind ein Teil der St. Sebastianus-Schützenbruderschaft in Deutschland, Büderich 1567 e.V. Tradition, Gemeinschaft und Freude – das ist unser Motto!"
        countdownSlot={
          <SchuetzenfestCountdown
            targetDate={NEXT_SCHUETZENFEST_DATE}
            title="Nächstes Schützenfest"
            variant="glass"
          />
        }
      />

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
                      <NewsCard key={article._id} article={article} />
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

      {/* ── INSTAGRAM (Design wie Screenshot) ── */}
      <InstagramSection posts={instagramPosts} />


    </>
  );
}
