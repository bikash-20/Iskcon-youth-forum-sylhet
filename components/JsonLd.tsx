import { SITE_URL, TEMPLE_DETAILS } from "@/lib/seo";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HinduTemple", "PlaceOfWorship", "ReligiousOrganization"],
        "@id": `${SITE_URL}/#temple`,
        name: TEMPLE_DETAILS.name,
        alternateName: TEMPLE_DETAILS.alternateName,
        legalName: TEMPLE_DETAILS.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/co-ordinator.jpg`,
        image: `${SITE_URL}/co-ordinator.jpg`,
        description: TEMPLE_DETAILS.description,
        telephone: TEMPLE_DETAILS.telephone[0],
        email: "iyfsylhet@gmail.com",
        sameAs: TEMPLE_DETAILS.sameAs,
        address: {
          "@type": "PostalAddress",
          streetAddress: TEMPLE_DETAILS.address.streetAddress,
          addressLocality: TEMPLE_DETAILS.address.addressLocality,
          addressRegion: TEMPLE_DETAILS.address.addressRegion,
          postalCode: TEMPLE_DETAILS.address.postalCode,
          addressCountry: TEMPLE_DETAILS.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: TEMPLE_DETAILS.geo.latitude,
          longitude: TEMPLE_DETAILS.geo.longitude,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "04:30",
            closes: "13:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "16:15",
            closes: "20:30",
          },
        ],
        hasMap:
          "https://www.google.com/maps?q=Sri+Sri+Radha+Madhava+Mandir+Jugaltila+Sylhet",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "ISKCON Youth Forum Sylhet | IYF Sylhet",
        alternateName: [
          "Sylhet ISKCON Mondir",
          "Sri Sri Radha Madhava Mandir Jugaltila",
          "ইস্কন যুব ফোরাম সিলেট",
        ],
        description:
          "Official website of ISKCON Youth Forum Sylhet (IYF Sylhet) at Sri Sri Radha Madhava Mandir, Jugaltila.",
        publisher: {
          "@id": `${SITE_URL}/#temple`,
        },
        inLanguage: ["en", "bn"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EventSchema({
  title,
  description,
  start,
  end,
  location,
  url,
  image,
}: {
  title: string;
  description: string;
  start: string;
  end?: string;
  location: string;
  url: string;
  image?: string;
}) {
  const isIso = !start.startsWith("Every");
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: title,
    description: description,
    startDate: isIso ? start : undefined,
    endDate: isIso && end ? end : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Sri Sri Radha Madhava Mandir, Jugaltila, Kajalshah",
        addressLocality: "Sylhet",
        postalCode: "3140",
        addressCountry: "BD",
      },
    },
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}/co-ordinator.jpg`,
    url: url,
    organizer: {
      "@type": "Organization",
      name: "ISKCON Youth Forum Sylhet",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
