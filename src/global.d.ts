interface RequestInit {
  onProgress?: (
    /**range 0 ~ 1 */
    percent: number,
    /**executed length */
    progress: number,
    /**file length */
    total: number
  ) => void
  /**
   *
   * 'full' unsupported now
   * @see https://developer.chrome.com/articles/fetch-streaming-requests/
   */
  duplex?: 'half' | 'full'
}

declare module 'express-throttle-bandwidth' {
  const d: any
  export default d
}
