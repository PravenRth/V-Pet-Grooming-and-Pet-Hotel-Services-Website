// config.js
// Central config used across all V Pet pages via the VPetConfig object.
// Edit the values below to update contact info, hours, banner, and FAQ
// content site-wide — every page pulls from here automatically.

const VPetConfig = {
  // Displayed phone number (formatted for humans)
  phone: "011-3602 0431",

  // WhatsApp number in international format, no symbols (used for wa.me links)
  whatsapp: "601136020431",

  // Full address shown on location sections
  address: "83, Jalan Seri Impian 1, Taman Impian Emas, 83100 Skudai, Johor",

  // Opening days + hours (combined as "openingDays: openingHours" on pages)
  openingDays: "Tuesday – Sunday",
  openingHours: "10am – 7pm",

  // Top banner (set showBanner to false to hide it)
  showBanner: false,
  bannerText: "🎉 New customers get 10% off their first grooming session!",

  // FAQ content for faq.html — grouped by category
  faq: [
    {
      category: "Grooming",
      questions: [
        {
          q: "Do I need to book an appointment for grooming?",
          a: "Yes, we recommend booking via WhatsApp so we can confirm a slot that suits you and your pet's schedule."
        },
        {
          q: "How long does a grooming session take?",
          a: "Basic grooming usually takes 1–2 hours, while full grooming or hand-cut styling can take 2–4 hours depending on your pet's size and coat condition."
        },
        {
          q: "Is there an extra charge for large or aggressive dogs?",
          a: "Yes, extra large breeds and dogs that require extra handling due to behaviour may incur additional charges. We'll always confirm this with you beforehand."
        }
      ]
    },
    {
      category: "Pet Hotel",
      questions: [
        {
          q: "What's included in a pet hotel stay?",
          a: "All stays include meals, fresh water, daily walks and playtime, clean bedding, and 24/7 supervision by our team."
        },
        {
          q: "Can I bring my pet's own food?",
          a: "Absolutely — if your pet has dietary preferences or is on a special diet, feel free to bring their usual food and we'll feed them accordingly."
        },
        {
          q: "Do prices change during festival seasons?",
          a: "Yes, pricing may be slightly higher during major festival periods due to high demand. We'll let you know in advance if this applies to your booking dates."
        }
      ]
    },
    {
      category: "Adoption",
      questions: [
        {
          q: "Is there a fee to adopt a dog?",
          a: "Please reach out to us on WhatsApp for details on adoption fees, which help cover vaccination, deworming, and general care costs."
        },
        {
          q: "Can I meet the dog before deciding to adopt?",
          a: "Yes, we encourage a meet-and-greet visit so you and the dog can get to know each other before making a decision."
        }
      ]
    },
    {
      category: "General",
      questions: [
        {
          q: "What are your opening hours?",
          a: "We're open Tuesday to Sunday, 10am to 7pm. We're closed on Mondays."
        },
        {
          q: "How can I contact you?",
          a: "The fastest way to reach us is via WhatsApp at 011-3602 0431. You can also visit us in person during opening hours."
        }
      ]
    }
  ]
};