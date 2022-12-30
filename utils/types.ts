export const allTypes = ["movie", "musicVideo", "podcastEpisode", "short", "tvEpisode", "tvSeries", "videoGame"]
export type TitleType = typeof allTypes[number];

export type OptionProps = {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}