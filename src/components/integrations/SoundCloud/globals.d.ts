interface Window {
  SC: SoundCloudApi
}

type SoundCloudApi = {
  Widget: Widget
}

type Widget = {
  (iframe: HTMLIFrameElement): WidgetInstance
  Events: Events
}

type WidgetInstance = {
  play: VoidFunction
  pause: VoidFunction
  bind: (eventType: string, listener: VoidFunction) => void
}

type Events = {
  [key in EventType]: string
}

type EventType = 'READY' | 'PLAY' | 'PAUSE' | 'FINISH'


