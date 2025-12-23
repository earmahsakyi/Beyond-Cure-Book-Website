const mongoose = require("mongoose");
const HomeContent = require("../model/HomeContent");

const defaultHomeContent = {
  hero: {
    badgeText: "A New Medical Nonfiction",
    title: "Beyond the Cure",
    subtitle: "What Antibiotics Teach Us About Medicine, Mortality, and What It Means to Heal",
    description:
      "A deeply human exploration of antimicrobial resistance where science meets story, and each patient reminds us why medicine is both art and evidence",
    primaryCtaText: "Buy the Book",
    primaryCtaLink: "#",
    secondaryCtaText: "Get Free Safety Guide",
    secondaryCtaLink: "#",
    availabilityText:
      "Available on Amazon, Barnes & Noble, and independent bookstores",
    bookCoverImage: "/bookcover.png"
  },
  aboutBook: {
    badgeText: "About the Book",
    heading: "What is Beyond the Cure?",
    paragraphs: [
      "Antibiotics have saved countless lives since their discovery—yet today, we face a crisis of antimicrobial resistance that threatens to unravel decades of medical progress. Beyond the Cure is not just about the science; it's about the people behind the prescriptions",
      "Through compelling patient stories and rigorous evidence, this book explores how we got here, what we can do differently, and why every antibiotic decision matters. From the ICU to the outpatient clinic, from policy debates to bedside conversations, you'll discover how medicine's most powerful tools require our most thoughtful stewardship",
      "Written for anyone who has ever taken—or prescribed—an antibiotic, Beyond the Cure bridges the gap between academic medicine and the real world where healing happens"
    ]
  },
  audiences: [
    {
        icon: "Users",
        title: "Patients & Families",
        description: "Understand what questions to ask and why your antibiotic choices matter for you—and for everyone.",
      },
      {
        icon: "Stethoscope",
        title: "Clinicians & Trainees",
        description: "Real cases and evidence-based frameworks to sharpen your antimicrobial decision-making.",
      },
      {
        icon: "Building2",
        title: "Hospitals & Stewardship Teams",
        description: "Practical insights to strengthen antimicrobial stewardship programs and improve patient outcomes.",
      },
  ],
  chapters: [
    {
    number: "01",
    title: "Poor Liver",
    description: "When the body's filter fails, every antibiotic choice becomes a calculation of risk.",
  },
  {
    number: "02",
    title: "The Resistance",
    description: "How bacteria evolve faster than we can develop new weapons against them.",
  },
  {
    number: "03",
    title: "Gut Feelings",
    description: "The microbiome revolution and why our internal ecosystem matters more than we thought.",
  },
  ],
  endorsements: [
    {
    quote: "A masterful blend of storytelling and science. Beyond the Cure is the book I wish I had when I started my career in infectious disease.",
    author: "Brad Spellberg, MD",
    title: "Chief Medical Officer, LA County + USC Medical Center",
    featured: true,
  },
  {
    quote: "Henry makes the invisible crisis of antimicrobial resistance visible and visceral. This book will change how you think about every prescription.",
    author: "Sarah Chen, MD, MPH",
    title: "Director of Antimicrobial Stewardship, Stanford Health",
    featured: false,
  },
  ],
  emailCapture: {
    title: "Free Antibiotic Safety Checklist",
    description: "A practical guide to the questions you should ask before starting or stopping any antibiotic. Designed for patients and caregivers",
    privacyNote: "We respect your privacy. Occasional updates about the book and antibiotic stewardship unsubscribe anytime."
  },
  finalCta: {
    title: "Ready to Go Beyond?",
    description: "Whether you're a patient seeking answers, a clinician refining your practice, or an organization looking for a compelling speaker let's connect",
    primaryCtaText: "Buy the Book",
    primaryCtaLink: "#",
    secondaryCtaText: "Invite Henry to Speak",
    secondaryCtaLink: "#",
    footerNote: ""
  }
};

async function seedHomeContent() {
  try {
    console.log(process.env.DATABASE_URL)
    await mongoose.connect(process.env.DATABASE_URL);

    const existing = await HomeContent.findOne();

    if (!existing) {
      await HomeContent.create(defaultHomeContent);
      console.log("✅ HomeContent seeded");
    } else {
      console.log("ℹ️ HomeContent already exists");
    }

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedHomeContent();
