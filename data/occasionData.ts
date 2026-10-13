export type DigitalProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  label: string;
  design: string;
};

export type OccasionCollection = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  products: DigitalProduct[];
};

export const occasionCollections: OccasionCollection[] =
  [
    {
      slug: "birthday",
      title: "Birthday Cards",
      eyebrow: "Made to celebrate",
      description:
        "Thoughtful birthday cards for the people who make life special.",
      intro:
        "Find a little something to make their birthday feel extra special.",
      products: [
        {
          id: "birthday-bloom",
          name: "Birthday Bloom",
          description:
            "A floral birthday card with a warm, timeless feel.",
          price: 3,
          label: "HAPPY BIRTHDAY",
          design: "birthday",
        },
        {
          id: "birthday-confetti",
          name: "A Day to Celebrate",
          description:
            "A cheerful card for someone who deserves extra joy.",
          price: 3,
          label: "LET'S CELEBRATE",
          design: "confetti",
        },
        {
          id: "birthday-minimal",
          name: "Simply Wonderful",
          description:
            "A minimal birthday greeting for someone special.",
          price: 4,
          label: "YOU ARE WONDERFUL",
          design: "minimal",
        },
      ],
    },
    {
      slug: "thank-you",
      title: "Thank You",
      eyebrow: "With gratitude",
      description:
        "Little notes to say thank you in a thoughtful way.",
      intro:
        "Sometimes a few heartfelt words mean more than a thousand gifts.",
      products: [
        {
          id: "thank-you-bloom",
          name: "Thank You, Truly",
          description:
            "A delicate floral card for a meaningful thank-you.",
          price: 3,
          label: "THANK YOU",
          design: "floral",
        },
        {
          id: "thank-you-heart",
          name: "From the Heart",
          description:
            "A warm way to show someone you appreciate them.",
          price: 3,
          label: "FROM THE HEART",
          design: "heart",
        },
        {
          id: "thank-you-simple",
          name: "So Grateful",
          description:
            "A clean and elegant note of appreciation.",
          price: 4,
          label: "SO GRATEFUL",
          design: "minimal",
        },
      ],
    },
    {
      slug: "thinking-of-you",
      title: "Thinking of You",
      eyebrow: "Just for you",
      description:
        "Gentle reminders that someone is loved and remembered.",
      intro:
        "Send a small reminder that someone is on your mind.",
      products: [
        {
          id: "thinking-bloom",
          name: "A Little Hello",
          description:
            "A soft floral greeting to brighten an ordinary day.",
          price: 3,
          label: "A LITTLE HELLO",
          design: "floral",
        },
        {
          id: "thinking-heart",
          name: "Here for You",
          description:
            "A thoughtful card for a friend who needs kindness.",
          price: 3,
          label: "HERE FOR YOU",
          design: "heart",
        },
        {
          id: "thinking-sunshine",
          name: "Sending Sunshine",
          description:
            "A cheerful note to send warmth from afar.",
          price: 4,
          label: "SENDING SUNSHINE",
          design: "sunshine",
        },
      ],
    },
    {
      slug: "self-care",
      title: "Self-Care Printables",
      eyebrow: "A moment for you",
      description:
        "Gentle reminders to slow down and make space for yourself.",
      intro:
        "Create a little space for rest, reflection, and encouragement.",
      products: [
        {
          id: "self-care-affirmations",
          name: "Daily Affirmation Cards",
          description:
            "Encouraging reminders for your daily routine.",
          price: 4,
          label: "YOU ARE ENOUGH",
          design: "affirmation",
        },
        {
          id: "self-care-journal",
          name: "Little Reflection Pages",
          description:
            "Printable prompts for quiet moments and reflection.",
          price: 4,
          label: "TAKE A MOMENT",
          design: "journal",
        },
        {
          id: "self-care-kindness",
          name: "Kindness to Yourself",
          description:
            "Printable reminders to treat yourself with care.",
          price: 5,
          label: "BE KIND TO YOU",
          design: "heart",
        },
      ],
    },
  ];

export function getOccasionCollection(
  slug: string,
) {
  return occasionCollections.find(
    (collection) => collection.slug === slug,
  );
}
