declare module 'tz-lookup' {
  /** Offline approximate IANA zone lookup; throws for out-of-range coordinates. */
  export default function tzLookup(latitude: number, longitude: number): string;
}
