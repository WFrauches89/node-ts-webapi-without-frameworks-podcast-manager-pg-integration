export enum ContentType {
  // Application types
  JSON = 'application/json',
  XML = 'application/xml',
  FORM_URLENCODED = 'application/x-www-form-urlencoded',
  JAVASCRIPT = 'application/javascript',
  OCTET_STREAM = 'application/octet-stream',
  PDF = 'application/pdf',
  ZIP = 'application/zip',

  // Text types
  PLAIN = 'text/plain',
  HTML = 'text/html',
  CSS = 'text/css',
  CSV = 'text/csv',

  // Image types
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  WEBP = 'image/webp',
  SVG = 'image/svg+xml',

  // Audio types
  MP3 = 'audio/mpeg',
  WAV = 'audio/wav',
  OGG = 'audio/ogg',

  // Video types
  MP4 = 'video/mp4',
  WEBM = 'video/webm',
  OGG_VIDEO = 'video/ogg',

  // Multipart
  FORM_DATA = 'multipart/form-data',
}
