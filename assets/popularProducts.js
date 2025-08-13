import { assets } from "./assets";

export const popularProducts = [
  {
    id: 1,
    name: "Apple Earphones",
    description: "Noise-cancellation, 40-hour battery",
    rating: 4.5,
    offerPrice: 299.99, // Changed from price to offerPrice, and made it a number
    images: [assets.apple_earphone_image],
  },
  {
    id: 2,
    name: "Bose QuietComfort 45",
    description: "Noise Cancellation, 24-hour battery",
    rating: 4.5,
    offerPrice: 329.99, // Changed from price to offerPrice, and made it a number
    images: [assets.bose_headphone_image],
  },
  {
    id: 3,
    name: "Samsung Galaxy S23",
    description: "Fitness Tracking, AMOLED Display",
    rating: 4.5,
    offerPrice: 799.99, // Changed from price to offerPrice, and made it a number
    images: [assets.samsung_s23phone_image],
  },
  {
    id: 4,
    name: "Garmin Venu 2",
    description: "Noise Cancellation, 24-hour battery",
    rating: 4.5,
    offerPrice: 349.99, // Changed from price to offerPrice, and made it a number
    images: [assets.venu_watch_image],
  },
  {
    id: 5,
    name: "PlayStation 5",
    description: "Ultra-HD, 825GB SSD, Ray Graphics",
    rating: 4.5,
    offerPrice: 499.99, // Changed from price to offerPrice, and made it a number
    images: [assets.playstation_image],
  },
  {
    id: 6,
    name: "Canon EOS R5",
    description: "45MP Sensor, 8K Video Recording",
    rating: 4.5,
    offerPrice: 3899.99, // Changed from price to offerPrice, and made it a number
    images: [assets.cannon_camera_image],
  },
];
