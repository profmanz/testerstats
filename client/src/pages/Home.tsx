import {
  ArrowDownRight,
  ArrowUpRight,
  Mail,
  Phone,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const WHATSAPP_URL = "https://wa.me/905376053602";
const PHONE_NUMBER = "+90 537 605 36 02";

const SERVICE_TOPICS = [
  {
    number: "01",
    id: "topic-statistical-analysis",
    label: "SPSS ile İstatistiksel Veri Analizi",
    treeLabel: "SPSS veri analizi",
    description:
      "Öğrenci ve akademisyenlerin tez, proje ve makale verileri; araştırma sorusuna uygun istatistiksel yöntemlerle değerlendirilir.",
    side: "left",
    row: 0,
  },
  {
    number: "02",
    id: "topic-apa-reporting",
    label: "APA Stili Raporlama (Akademik Format)",
    treeLabel: "APA raporlama",
    description:
      "Analiz sonuçları akademik kılavuzlara uygun tablolar ve anlaşılır açıklamalarla raporlanır.",
    side: "right",
    row: 0,
  },
  {
    number: "03",
    id: "topic-private-lessons",
    label: "Özel Ders",
    treeLabel: "Özel ders",
    description:
      "Teorik içeriği uygulamalı pratikle birleştiren, veri girişinden analiz ve sonuçları yorumlamaya uzanan kişiye özel SPSS eğitimi.",
    side: "left",
    row: 1,
  },
  {
    number: "04",
    id: "topic-survey-preparation",
    label: "Anket Hazırlama",
    treeLabel: "Anket hazırlama",
    description:
      "Araştırma amacınıza uygun anket hazırlama sürecinde soru yapısı ve veri toplama planı üzerine destek sunulur.",
    side: "right",
    row: 1,
  },
  {
    number: "05",
    id: "topic-spss-data-entry",
    label: "SPSS Veri Girişi",
    treeLabel: "SPSS veri girişi",
    description:
      "Araştırma verilerinin SPSS'te analiz öncesinde düzenli bir veri seti olarak hazırlanmasına odaklanılır.",
    side: "left",
    row: 2,
  },
  {
    number: "06",
    id: "topic-data-visualization",
    label: "Veri Görselleştirme (Tablo & Grafik)",
    treeLabel: "Veri görselleştirme",
    description:
      "Veriler ve analiz sonuçları, akademik çalışmalarda kullanılabilecek tablo ve grafiklerle daha anlaşılır biçimde sunulur.",
    side: "right",
    row: 2,
  },
  {
    number: "07",
    id: "topic-scale-development",
    label: "Ölçek Geliştirme",
    treeLabel: "Ölçek geliştirme",
    description:
      "Araştırmada ölçülmek istenen kavramlara uygun ölçek geliştirme ve bu çalışmanın analiz süreci birlikte değerlendirilir.",
    side: "left",
    row: 3,
  },
  {
    number: "08",
    id: "topic-biostatistics",
    label: "Sosyal Bilimler & Biyoistatistik Analizi",
    treeLabel: "Sosyal & biyoistatistik",
    description:
      "Sosyal bilimler, psikoloji, biyoloji ve sağlık bilimlerindeki araştırmalar için çalışma alanına uygun analiz ve yorumlama desteği.",
    side: "right",
    row: 3,
  },
  {
    number: "09",
    id: "topic-amos-cfa",
    label: "AMOS ile Doğrulayıcı Faktör Analizi",
    treeLabel: "AMOS · DFA",
    description:
      "AMOS hizmet başlıkları arasında yer alan doğrulayıcı faktör analizi (DFA/CFA) konusu için akademik analiz danışmanlığı.",
    side: "left",
    row: 4,
  },
  {
    number: "10",
    id: "topic-amos-sem",
    label: "AMOS ile Yapısal Eşitlik Modeli",
    treeLabel: "AMOS · YEM / SEM",
    description:
      "AMOS ile yapısal eşitlik modeli (YEM/SEM) çalışmalarında analiz sonuçlarını değerlendirmeye yönelik destek.",
    side: "right",
    row: 4,
  },
] as const;

const TREE_BRANCH_PATHS = [
  "M500 580 C450 578 395 563 340 558",
  "M500 580 C550 578 605 563 660 558",
  "M500 510 C450 500 395 456 340 434",
  "M500 510 C550 500 605 456 660 434",
  "M500 420 C450 398 395 340 340 310",
  "M500 420 C550 398 605 340 660 310",
  "M500 325 C450 292 395 221 340 186",
  "M500 325 C550 292 605 221 660 186",
  "M500 230 C450 188 395 119 340 62",
  "M500 230 C550 188 605 119 660 62",
] as const;

function BrandMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className="brand-mark">
      <circle cx="20" cy="20" r="19" fill="currentColor" opacity=".1" />
      <path
        d="M20 31V15M20 21l-8-7m8 3 8-8m-8 16 9-6m-9 1-8-3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle cx="12" cy="14" r="2.3" fill="currentColor" />
      <circle cx="28" cy="9" r="2.3" fill="currentColor" />
      <circle cx="29" cy="20" r="2.3" fill="currentColor" />
      <circle cx="12" cy="17" r="2.3" fill="currentColor" />
      <path
        d="M14 32h12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -36px 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
}

function AnimatedMetric({
  value,
  suffix,
  label,
  detail,
}: {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}) {
  const [count, setCount] = useState(value);
  const metricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = metricRef.current;
    if (!element) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setCount(0);
        const duration = 1200;
        let startedAt = 0;
        const animate = (time: number) => {
          if (!startedAt) startedAt = time;
          const progress = Math.min((time - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.45 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div
      className="stat-card"
      data-reveal
      ref={metricRef}
      role="group"
      aria-label={`${value}${suffix} ${label}`}
    >
      <span className="stat-value" aria-hidden="true">
        {count}
        <span>{suffix}</span>
      </span>
      <strong className="stat-label">{label}</strong>
      <span className="stat-detail">{detail}</span>
    </div>
  );
}

function TreeGraphic() {
  return (
    <div
      className="tree-panel"
      role="group"
      aria-label="Çınar ağacının dallarına yerleştirilmiş hizmet bağlantıları"
    >
      <div className="tree-panel-topline">
        <span className="tree-dot" />
        <span>İÇERİĞİ KEŞFEDİN</span>
        <span className="tree-panel-note">Bir dala dokunun</span>
      </div>
      <picture className="tree-illustration" aria-hidden="true">
        <source
          media="(max-width: 420px)"
          srcSet="./images/plane-tree-mobile.webp"
        />
        <img
          src="./images/plane-tree-desktop.webp"
          alt=""
          decoding="async"
          loading="eager"
        />
      </picture>
      <svg
        className="tree-art"
        viewBox="0 0 1000 620"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <g
          className="tree-branches"
          fill="none"
          stroke="#796950"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {TREE_BRANCH_PATHS.map((path, index) => (
            <path key={index} d={path} strokeWidth={index < 4 ? 8 : 6} />
          ))}
          {SERVICE_TOPICS.map((topic) => (
            <circle
              key={topic.id}
              cx={topic.side === "left" ? 340 : 660}
              cy={558 - topic.row * 124}
              r="5"
              fill="#f8fbf6"
              stroke="#66816a"
              strokeWidth="2"
            />
          ))}
        </g>
      </svg>
      <nav className="tree-links" aria-label="İçerik anahtar kelimeleri">
        {SERVICE_TOPICS.map((topic) => (
          <a
            key={topic.id}
            className={`branch-link branch-link--${topic.side}`}
            href={`#${topic.id}`}
            aria-label={`${topic.number}. ${topic.label} konusuna git`}
            style={{ top: `${90 - topic.row * 20}%` }}
          >
            <span className="branch-index">{topic.number}</span>
            <span className="branch-label">{topic.treeLabel}</span>
            <ArrowDownRight aria-hidden="true" size={13} />
          </a>
        ))}
      </nav>
      <div className="tree-rootline" aria-hidden="true">
        <span />
        İSTATİSTİKSEL BİLGİDEN GÜVENİLİR SONUCA
      </div>
    </div>
  );
}

function WhatsAppLink({
  children,
  className = "button button--green",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp üzerinden +90 537 605 36 02 numarasına ulaşın"
    >
      {children}
      <ArrowUpRight aria-hidden="true" size={16} />
    </a>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  id,
}: {
  number: string;
  eyebrow: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <span className="section-number">{number}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
    </div>
  );
}

export default function Home() {
  useScrollReveal();

  return (
    <>
      <a className="skip-link" href="#main-content">
        İçeriğe geç
      </a>
      <header className="site-header">
        <div className="nav-shell">
          <a
            className="brand"
            href="#home"
            aria-label="Çınar Danışmanlık — Başlangıç"
          >
            <BrandMark />
            <span className="brand-copy">
              <strong>Çınar Danışmanlık</strong>
              <small>İstatistik Merkezi</small>
            </span>
          </a>
          <nav className="main-nav" aria-label="Ana gezinme">
            <a className="nav-link nav-link--active" href="#home">
              Başlangıç
            </a>
            <a className="nav-link" href="#about">
              Hakkımızda
            </a>
            <a className="nav-link" href="#contact">
              İletişim
            </a>
          </nav>
          <a
            className="header-contact"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span>WhatsApp</span>
            <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>
      </header>

      <main id="main-content">
        <section
          className="hero page-shell"
          id="home"
          aria-labelledby="site-title"
        >
          <div className="hero-art-wrap">
            <TreeGraphic />
          </div>
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="eyebrow-rule" />
              ÇINAR DANIŞMANLIK İSTATİSTİK MERKEZİ
            </p>
            <h1 id="site-title">
              Çınar Danışmanlık
              <br />
              <span>İstatistik Merkezi</span>
            </h1>
            <h2>Profesyonel SPSS İstatistik Analizi Danışmanlığı</h2>
            <p>
              Çınar Danışmanlık İstatistik Merkezi olarak, uzman{" "}
              <strong>SPSS istatistik analizi</strong> hizmetlerimizle{" "}
              <strong>öğrenci</strong> ve <strong>akademisyenlerin</strong> her
              zaman yanındayız.
            </p>
            <p>
              Özellikle Sosyal Bilimler &amp; Biyoloji alanlarında yaygın olarak
              kullanılan IBM SPSS programını kullanarak{" "}
              <strong>Lisans, Yüksek Lisans, Doktora</strong> ve{" "}
              <strong>Akademik Dergi</strong> için uygun seviyelerde profesyonel
              istatistik analizleri yapıyoruz.
            </p>
            <p>
              Yaptığımız analizlerin sonucunda{" "}
              <strong>akademik formatta tablolar</strong> (APA format)
              oluşturuyoruz ve sonuçları <strong>yorumlayarak</strong> sizlere
              anlaşılır biçimde <strong>raporluyoruz</strong>.
            </p>
            <div className="hero-actions">
              <WhatsAppLink>Bizimle iletişime geçin</WhatsAppLink>
              <a className="text-link" href="#analysis-services">
                Hizmetleri keşfedin{" "}
                <ArrowDownRight aria-hidden="true" size={15} />
              </a>
            </div>
            <div className="hero-note">
              <span className="note-mark">“</span>
              <span>
                Bilimsel disiplin, anlaşılır raporlama ve etik danışmanlık.
              </span>
            </div>
          </div>
        </section>

        <section
          className="intro-section section-pad"
          aria-label="SPSS analiz rehberleri hakkında"
        >
          <div className="content-shell intro-grid">
            <div className="intro-aside">
              <span className="eyebrow">BİLGİ KAYNAĞIMIZ</span>
              <span className="aside-rule" />
              <p>Ücretsiz rehberlerden profesyonel danışmanlığa.</p>
            </div>
            <div className="prose">
              <p>
                <strong>Ücretli</strong> verdiğimiz hizmetlerimizden bahsetmeye
                geçmeden önce, <strong>alandaki uzmanlığımızdan</strong> emin
                olmanız için, bu web sitesinde ücretsiz olarak yayınladığımız{" "}
                <a
                  href="https://www.spss-yardimi.com/category/spss-analiz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  100’den fazla SPSS analizi
                </a>{" "}
                rehberinden oluşan bilgi kaynağımızdan bahsetmek istiyoruz. Bu
                rehberlerin hepsi bizim tarafımızdan elle manuel olarak
                yazılmıştır, kontrolsüz yapay zeka kullanılmamıştır ve bilimsel
                literatüre uygundur. Orijinal ekran görüntüleriyle
                desteklediğimiz SPSS analizi rehberlerimiz, SPSS’i ücretsiz
                olarak öğrenmek isteyen bütün üniversite öğrencileri ve
                akademisyenlerin kullanımına açıktır.
              </p>
              <p>
                <strong>Türkçe</strong> ve <strong>İngilizce</strong> dillerinde
                SPSS analizi hizmetimiz mevcuttur.
              </p>
              <p>
                Uzmanımız <strong>Ziynet Çınar</strong> ile, başta üniversite
                öğrencileri ve akademisyenlere yönelik hizmetlerimizde{" "}
                <strong>%100 memnuniyet</strong> hedefiyle çalışıyor ve SPSS
                konusunda yüzlerce öğrenci ve onlarca akademisyene yol göstermiş
                olmak bizi çok mutlu ediyor. Her zaman akademik standartlarda en
                yüksek kalitede çalışmalar sunmaya gayret ediyoruz.
              </p>
              <blockquote>
                Ödev yapma veya tez yazma gibi etik dışı işler yapmıyoruz. Tez
                veya makale yazarken istatistik analizi kısmında yetersiz
                kaldığınız noktada, size istatistik danışmanlık hizmetleri
                sunarak, öğrenmenize ve çalışmanızı başarıyla yürütmenize destek
                oluyoruz.
              </blockquote>
              <WhatsAppLink className="button button--outline">
                Bizimle İletişime Geçip Ücret Teklifi Alın
              </WhatsAppLink>
            </div>
          </div>
        </section>

        <section
          className="service-section section-pad"
          id="analysis-services"
          aria-labelledby="services-title"
        >
          <div className="content-shell">
            <SectionHeading
              number="01"
              eyebrow="İSTATİSTİK DANIŞMANLIĞI"
              title="SPSS Analizi Danışmanlık Hizmetleri"
              id="services-title"
            />
            <div className="section-body two-column" data-reveal>
              <div className="prose">
                <p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    spss danışmanlık profesyonel hizmetlerimiz
                  </a>{" "}
                  Profesyonel SPSS Danışmanlığı hizmetimizi, SPSS kullanarak
                  istatistiksel analizler yapmak isteyen bütün{" "}
                  <strong>üniversite öğrencileri</strong> ve{" "}
                  <strong>akademisyenlere</strong> sunmaktayız.
                </p>
                <p>
                  Öğrencilerin <strong>bitirme tezi</strong> veya
                  akademisyenlerin <strong>dergi makalesi</strong> için
                  istatistik danışmanlık hizmetleri başta olmak üzere,
                  hizmetlerimiz her seviyede çalışma için istatistik analizi
                  sürecinin bütün aşamalarını kapsamaktadır.
                </p>
                <p>
                  Veri analizi sürecinde başlangıçtan sonuna kadar her aşamada
                  size yardımcı oluyor, verilerinizi doğru şekilde analiz edip
                  yorumlamanıza katkıda bulunuyoruz.
                </p>
              </div>
              <ul
                className="service-list"
                aria-label="SPSS danışmanlık hizmetleri"
              >
                {SERVICE_TOPICS.map((topic) => (
                  <li key={topic.id}>
                    <a href={`#${topic.id}`}>
                      <span className="service-number">{topic.number}</span>
                      <span className="service-label">{topic.label}</span>
                      <ArrowDownRight aria-hidden="true" size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="service-topics"
              aria-label="Hizmet başlıklarının açıklamaları"
            >
              {SERVICE_TOPICS.map((topic) => (
                <article
                  className="service-topic"
                  id={topic.id}
                  key={topic.id}
                  data-reveal
                >
                  <span className="service-topic-number">
                    HİZMET {topic.number}
                  </span>
                  <h3>{topic.label}</h3>
                  <p>{topic.description}</p>
                </article>
              ))}
            </div>
            <div className="section-cta">
              <span>İhtiyacınıza uygun çözümü konuşalım.</span>
              <WhatsAppLink className="button button--text">
                Fiyat Teklifi Almak İçin Tıklayın
              </WhatsAppLink>
            </div>
          </div>
        </section>

        <section
          className="visual-break section-pad"
          aria-label="Veri analizi ve akademik araştırma görselleri"
        >
          <div className="content-shell visual-gallery">
            <figure className="visual-card" data-reveal>
              <img
                src="./images/data-analysis-laptop.jpg"
                alt="Bilgisayarda veri analizi ve istatistik grafikleri"
                width={3000}
                height={2000}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>01 / VERİ ANALİZİ</span>
                <strong>İstatistiksel veri analizi ve grafikler</strong>
              </figcaption>
            </figure>
            <figure className="visual-card" data-reveal>
              <img
                src="./images/statistics-research.jpg"
                alt="Araştırma verilerini ve grafiklerini gösteren bir laptop ekranı"
                width={3000}
                height={2000}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>02 / AKADEMİK ÇALIŞMA</span>
                <strong>Araştırma verilerinden anlamlı sonuçlara</strong>
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          className="thesis-section section-pad"
          id="thesis-analysis"
          aria-labelledby="thesis-title"
        >
          <div className="content-shell">
            <SectionHeading
              number="02"
              eyebrow="AKADEMİK ÇALIŞMALAR"
              title="Tez & Makale İçin SPSS Analizi"
              id="thesis-title"
            />
            <div className="section-body thesis-layout" data-reveal>
              <div className="thesis-intro prose">
                <p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    profesyonel spss analiz raporlama hizmetlerimiz
                  </a>
                </p>
                <p>
                  Tez yazarken bir araştırma yapıp veri toplayan{" "}
                  <strong>öğrencilerin</strong> topladıkları verilerin
                  istatistiksel analizi konusunda profesyonel destek sunuyoruz.
                  Böylece öğrenciler yaptıkları araştırmadaki veri analizi
                  sürecine ve araştırma sonuçlarına hakim oluyor; tezlerini en
                  doğru şekilde yazmaya devam edebiliyorlar.
                </p>
                <p>
                  Yaptıkları araştırmayı akademik dergide yayınlamak isteyen{" "}
                  <strong>akademisyenler</strong> için de profesyonel istatistik
                  analizi danışmanlığı sunarak, <strong>hocalarımızın</strong>{" "}
                  yaptıkları araştırmadan maksimum verim almasını sağlıyoruz.
                </p>
                <p>
                  <strong>SPSS</strong> ile verileri analiz ediyor, sonuçları{" "}
                  <strong>tablolar</strong> ve <strong>grafiklerle</strong>{" "}
                  zenginleştiriyor, <strong>akademik kılavuzlara uygun</strong>{" "}
                  <strong>raporlama</strong> yapıyoruz.
                </p>
                <p>
                  Profesyonel istatistik danışmanlık hizmetlerimizle veri
                  analizi sürecinin <strong>doğru ve güvenilir</strong> bir
                  şekilde yürütülmesini sağlıyoruz.
                </p>
              </div>
              <ul className="study-list" aria-label="Akademik çalışma türleri">
                <li>
                  <span>01</span>Lisans Tez Analizi
                </li>
                <li>
                  <span>02</span>Yüksek Lisans Tez Analizi
                </li>
                <li>
                  <span>03</span>Doktora Tez Analizi
                </li>
                <li>
                  <span>04</span>Tıpta Uzmanlık Tez Analizi
                </li>
                <li>
                  <span>05</span>Diş Hekimliği Tez Analizi
                </li>
                <li>
                  <span>06</span>Dergi Makalesi İçin Analiz
                </li>
              </ul>
            </div>
            <div className="section-cta">
              <span>Çalışmanızın kapsamını birlikte değerlendirelim.</span>
              <WhatsAppLink className="button button--text">
                Fiyat Teklifi Almak İçin Tıklayın
              </WhatsAppLink>
            </div>
          </div>
        </section>

        <section
          className="education-section section-pad"
          id="education"
          aria-labelledby="education-title"
        >
          <div className="content-shell">
            <SectionHeading
              number="03"
              eyebrow="UYGULAMALI ÖĞRENME"
              title="SPSS Eğitimi"
              id="education-title"
            />
            <div className="section-body two-column education-body" data-reveal>
              <div className="prose">
                <p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    temel ve ileri seviye spss eğitimleri
                  </a>{" "}
                  Üniversite öğrencileri, akademisyenler ve özel sektör
                  çalışanları için özelleştirilmiş SPSS eğitimi hizmetleri de
                  sunuyoruz. Eğitimlerimizde <strong>teorik içerik</strong> ve{" "}
                  <strong>uygulamalı pratik</strong> beraber anlatarak
                  istatistiksel veri analizi konusunda geniş bir anlayış
                  geliştirmenizi amaçlıyoruz.
                </p>
                <p>
                  Derslerimizi çoğunlukla <strong>Online Ders</strong>{" "}
                  formatında yapmakla beraber, isteğinize bağlı olarak yüz yüze
                  eğitim de verebilmekteyiz.
                </p>
                <p>
                  <strong>Özel Ders</strong> şeklinde işlediğimiz
                  eğitimlerimizin sonunda SPSS programını etkin bir şekilde
                  kullanmayı öğrenerek veri girişinden analize ve sonuçların
                  yorumlanmasına kadar olan süreçleri ustalıkla yönetebilecek
                  donanıma sahip olmanızı amaçlamaktayız.
                </p>
                <p>
                  SPSS’e yeni başlayanlar için{" "}
                  <strong>Temel SPSS Eğitimi</strong> ve tecrübeli olup kendini
                  geliştirmek isteyenler için{" "}
                  <strong>İleri Seviye SPSS Eğitimi</strong> şeklinde kurs
                  paketlerimiz bulunmaktadır.
                </p>
                <p>
                  <strong>Yalnızca belirli konuları</strong> öğrenmek isteyen
                  kişiler için de, özelleştirilmiş SPSS eğitimleri sunmaktayız.
                </p>
                <p>
                  SPSS eğitimlerimiz hakkında ayrıntılı bilgi almak için bizimle
                  iletişime geçebilirsiniz.
                </p>
              </div>
              <aside className="education-aside">
                <span className="aside-kicker">ÖĞRENME YOLCULUĞU</span>
                <div className="education-step">
                  <span>01</span>
                  <strong>Veri girişi</strong>
                </div>
                <div className="education-step">
                  <span>02</span>
                  <strong>İstatistiksel analiz</strong>
                </div>
                <div className="education-step">
                  <span>03</span>
                  <strong>Sonuçları yorumlama</strong>
                </div>
                <p>
                  Temelden ileri seviyeye, ihtiyacınıza göre özelleştirilmiş
                  dersler.
                </p>
              </aside>
            </div>
            <div className="section-cta">
              <span>Eğitim içeriğini birlikte belirleyelim.</span>
              <WhatsAppLink className="button button--text">
                Ücret Teklifi Almak İçin Tıklayın
              </WhatsAppLink>
            </div>
          </div>
        </section>

        <section
          className="why-section section-pad"
          aria-labelledby="why-title"
        >
          <div className="content-shell why-layout" data-reveal>
            <div>
              <SectionHeading
                number="04"
                eyebrow="BİRLİKTE ÇALIŞMAK"
                title="Neden Biz?"
                id="why-title"
              />
              <p className="why-lead">
                41 yıllık deneyimimizle, bilimsel araştırma ve veri analizinde
                etik değerlere bağlı, güvenilir destek sunuyoruz.
              </p>
            </div>
            <div className="trust-list" aria-label="Hizmet yaklaşımımız">
              <div data-reveal>
                <span>01</span>
                <strong>Güvenilir iletişim</strong>
              </div>
              <div data-reveal>
                <span>02</span>
                <strong>Uygun fiyat</strong>
              </div>
              <div data-reveal>
                <span>03</span>
                <strong>Zamanında teslim</strong>
              </div>
              <div data-reveal>
                <span>04</span>
                <strong>Memnuniyet</strong>
              </div>
            </div>
          </div>
          <div className="content-shell why-stats">
            <AnimatedMetric
              value={41}
              suffix=" yıl"
              label="Deneyim"
              detail="İstatistik"
            />
            <AnimatedMetric
              value={100}
              suffix="%"
              label="Müşteri memnuniyeti hedefi"
              detail="Bilimsel disiplin ve etik ilkelerle"
            />
            <div className="why-story" data-reveal>
              <span className="story-mark" aria-hidden="true">
                ✳
              </span>
              <p>
                SPSS konusunda yüzlerce öğrenci ve onlarca akademisyene yol
                göstermiş olmak bizi çok mutlu ediyor.
              </p>
            </div>
          </div>
        </section>

        <section
          className="home-contact section-pad"
          aria-labelledby="home-contact-title"
        >
          <div className="content-shell home-contact-panel">
            <div>
              <p className="eyebrow">BİZE DANIŞIN</p>
              <h2 id="home-contact-title">Bizimle İletişime Geçin</h2>
              <p>
                Size özel SPSS analizi çözümlerimiz hakkında daha fazla bilgi
                almak veya hemen bir fiyat teklifi almak için lütfen{" "}
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  bizimle <strong>Telefon numaramız</strong> üzerinden iletişime
                  geçin
                </a>
                . Veri analizi, SPSS eğitimi veya tez danışmanlığı konusundaki
                gereksinimlerinizi bize bildirin; size en uygun çözümü sunmak
                için hazırız.
              </p>
              <p>
                İstatistiksel veri analizi ve SPSS danışmanlığı konularında
                ihtiyaçlarınıza yönelik profesyonel çözümlerle size yardımcı
                olabiliriz. Tez çalışmanızın veya araştırmanızın başarılı bir
                şekilde tamamlanması için doğru analizlere ve uzman rehberliğe
                ihtiyacınız varsa, Çınar Danışmanlık İstatistik Merkezi olarak biz
                buradayız!
              </p>
              <WhatsAppLink>
                Bizimle İletişime Geçip Ücret Teklifi Alın
              </WhatsAppLink>
            </div>
            <div className="contact-stamp" aria-hidden="true">
              <BrandMark />
              <span>
                ÇINAR
                <br />
                DANIŞMANLIK
              </span>
              <small>İSTATİSTİK MERKEZİ</small>
            </div>
          </div>
        </section>

        <section
          className="about-section section-pad"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="content-shell">
            <SectionHeading
              number="05"
              eyebrow="MERKEZİMİZİ TANIYIN"
              title="Hakkımızda"
              id="about-title"
            />
            <div className="about-content prose">
              <div className="founder-block">
                <p className="eyebrow">UZMANIMIZ</p>
                <h3>Ziynet Çınar</h3>
                <p>
                  Akademik eğitim hayatını Hacettepe Üniversitesi’nde sürdüren
                  uzmanımız, farklı disiplinleri bir araya getiren güçlü bir
                  eğitim geçmişine sahiptir.
                </p>
                <p>
                  Lisans eğitimini Hacettepe Üniversitesi Fen Fakültesi
                  İstatistik Bölümü’nde tamamlayan uzmanımız, ardından Hacettepe
                  Üniversitesi Tıp Fakültesi Temel Tıp Bilimleri Bölümü’nde
                  yüksek lisans eğitimini sürdürmüştür. Akademik çalışmalarını
                  daha ileri bir seviyeye taşıyarak aynı bölümde bütünleşik
                  doktora eğitimini tamamlamıştır.
                </p>
                <p>
                  İstatistik ve temel tıp bilimlerini bir araya getiren akademik
                  altyapısı sayesinde bilimsel araştırma, veri analizi ve temel
                  tıp bilimleri alanlarında disiplinler arası bir bakış açısına
                  sahiptir.
                </p>
              </div>
              <WhatsAppLink className="button button--outline">
                İhtiyacınız olan bütün danışmanlık hizmetleri için lütfen
                bizimle iletişime geçin.
              </WhatsAppLink>
            </div>
          </div>
        </section>

        <section
          className="contact-section section-pad"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="content-shell contact-layout">
            <div className="contact-copy">
              <SectionHeading
                number="06"
                eyebrow="BİZE ULAŞIN"
                title="İletişim"
                id="contact-title"
              />
              <h3>Uzman İstatistik Desteğine Ulaşın</h3>
              <div className="prose">
                <p>
                  Bizimle iletişime geçmek için aşağıdaki bilgileri
                  kullanabilirsiniz. İstatistiksel veri analizi, SPSS
                  danışmanlığı veya eğitim hizmetleriyle ilgili sorularınızı
                  veya danışmanlık taleplerinizi memnuniyetle karşılarız. Size
                  en kısa sürede geri dönüş yapmak için buradayız.
                </p>
                <p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    spss tez analizi istatistik ödev yaptırma ücretli spss veri
                    analizi danışmanlık
                  </a>
                </p>
                <p>Bilgi ve destek talepleriniz için bize ulaşın.</p>
              </div>
            </div>
            <div className="contact-card">
              <a href="tel:+905376053602" className="contact-row">
                <span className="contact-icon">
                  <Phone aria-hidden="true" size={18} />
                </span>
                <span>
                  <small>Telefon</small>
                  <strong>{PHONE_NUMBER}</strong>
                </span>
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
              <a href="mailto:example@gmail.com" className="contact-row">
                <span className="contact-icon">
                  <Mail aria-hidden="true" size={18} />
                </span>
                <span>
                  <small>E-posta</small>
                  <strong>example@gmail.com</strong>
                </span>
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
              <WhatsAppLink className="button button--green contact-card-cta">
                WhatsApp ile yazın
              </WhatsAppLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-shell footer-main">
          <a className="brand footer-brand" href="#home">
            <BrandMark />
            <span className="brand-copy">
              <strong>Çınar Danışmanlık</strong>
              <small>İstatistik Merkezi</small>
            </span>
          </a>
          <p>
            Çınar Danışmanlık İstatistik Merkezi olarak, akademik çalışmalarınız için
            profesyonel istatistik analizi, raporlama ve eğitim desteği
            sunuyoruz.
          </p>
          <div className="footer-contact">
            <a href="tel:+905376053602">{PHONE_NUMBER}</a>
          </div>
        </div>
        <div className="content-shell footer-bottom">
          <span>© Çınar Danışmanlık İstatistik Merkezi</span>
          <a
            href="https://www.metaistatistik.com/"
            target="_blank"
            rel="noreferrer"
          >
            Profesyonel SPSS &amp; AMOS Analiz Hizmetleri – Meta İstatistik{" "}
            <ArrowUpRight aria-hidden="true" size={13} />
          </a>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp ile +90 537 605 36 02 numarasına mesaj gönderin"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="whatsapp-glyph">
          <path
            fill="currentColor"
            d="M20.52 3.48A11.87 11.87 0 0 0 12.08 0C5.48 0 .12 5.36.12 11.96c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.9 11.9 0 0 0 5.88 1.5h.01c6.59 0 11.95-5.36 11.95-11.96 0-3.19-1.24-6.19-3.52-8.43ZM12.09 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.9 9.9 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.02c0 5.48-4.45 9.93-9.92 9.93Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z"
          />
        </svg>
        <span>WhatsApp</span>
      </a>
    </>
  );
}
