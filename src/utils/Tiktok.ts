export function transformUrlTiktokIntoIdTiktok(url: string): string {
  let lastSegment = url.split('/').pop();

  // Check if the last segment contains a "?" and split again
  const id = lastSegment?.includes('?')
    ? lastSegment.split('?')[0]
    : lastSegment;

  return id ?? '';
}

interface TiktokEmbeddedProps {
  autoplay?: 1 | 0;
  controls?: 1 | 0;
  progress_bar?: 1 | 0;
  play_button?: 1 | 0;
  volume_control?: 1 | 0;
  fullscreen_button?: 1 | 0;
  music_info?: 1 | 0;
  description?: 1 | 0;
  rel?: 1 | 0;
  native_context_menu?: 1 | 0;
  muted?: 1 | 0;
}

export function transformIdTiktokIntoEmbeddedTiktok(
  id: string,
  props: TiktokEmbeddedProps
): string {
  return `https://www.tiktok.com/player/v1/${id}?autoplay=${
    props.autoplay ?? 1
  }&controls=${props.controls ?? 0}&progress_bar=${
    props.progress_bar ?? 0
  }&play_button=${props.play_button ?? 0}&volume_control=${
    props.volume_control ?? 0
  }&fullscreen_button=${props.fullscreen_button ?? 0}&music_info=${
    props.music_info ?? 0
  }&description=${props.description ?? 0}&rel=${
    props.rel ?? 0
  }&native_context_menu=${props.native_context_menu ?? 0}&muted=${
    props.muted ?? 1
  }`;
}

export function transformUrlTiktokIntoEmbeddedTiktok(
  url: string,
  props: TiktokEmbeddedProps
): string {
  return transformIdTiktokIntoEmbeddedTiktok(
    transformUrlTiktokIntoIdTiktok(url),
    props
  );
}
