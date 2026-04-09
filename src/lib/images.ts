import cricketImg from "@/assets/cricket-training.jpg";
import footballImg from "@/assets/football-training.jpg";
import karateImg from "@/assets/karate-training.jpg";
import danceImg from "@/assets/dance-performance.jpg";
import musicImg from "@/assets/music-class.jpg";
import yogaImg from "@/assets/yoga-session.jpg";
import campusImg from "@/assets/campus-aerial.jpg";

export const defaultSportImages: Record<string, string> = {
  cricket: cricketImg,
  football: footballImg,
  karate: karateImg,
  dance: danceImg,
  music: musicImg,
  theatre: danceImg,
  yoga: yogaImg,
  athletics: footballImg,
  gymnastics: yogaImg,
};

/** Returns custom image from siteData if set, otherwise falls back to default */
export function getSportImage(sportId: string, customImage?: string): string {
  if (customImage) return customImage;
  return defaultSportImages[sportId] || campusImg;
}

export const galleryImages: Record<string, string> = {
  Cricket: cricketImg,
  Dance: danceImg,
  Events: campusImg,
  Football: footballImg,
};

export { campusImg };
