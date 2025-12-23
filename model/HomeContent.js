const mongoose = require('mongoose');


const HomeContentSchema = new mongoose.Schema({
    
    hero: {
      badgeText: { type: String },
      title: { type: String },
      subtitle: { type: String },
      description: { type: String },
      primaryCtaText: { type: String },
      primaryCtaLink: { type: String },
      secondaryCtaText: { type: String },
      secondaryCtaLink: { type: String },
      availabilityText: { type: String },
      bookCoverImage: { type: String }
    },

    aboutBook: {
      badgeText: { type: String },
      heading: { type: String },
      paragraphs: [{ type: String }]
    },

    aboutAuthor: {
      name: { type: String },
      shortBio: { type: String },
      longBio: { type: String },
      authorImage: { type: String },
      readMoreLink: { type: String }
    },

    audiences: [
      {
        title: { type: String },
        description: { type: String },
        icon: { type: String }
      }
    ],

    chapters: [
      {
        number: { type: String },
        title: { type: String },
        description: { type: String }
      }
    ],

    endorsements: [
      {
        quote: { type: String },
        author: { type: String },
        title: { type: String },
        featured: { type: Boolean, default: false }
      }
    ],

    emailCapture: {
      title: { type: String },
      description: { type: String },
      privacyNote: { type: String }
    },

    finalCta: {
      title: { type: String },
      description: { type: String },
      primaryCtaText: { type: String },
      primaryCtaLink: { type: String },
      secondaryCtaText: { type: String },
      secondaryCtaLink: { type: String },
      footerNote: { type: String }
    },
},
    {
    timestamps: { updatedAt: true, createdAt: false }
  }
);
module.exports = mongoose.model('HomeContent',HomeContentSchema);