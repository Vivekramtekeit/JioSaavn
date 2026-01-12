
import { Image } from "react-native";
import * as FileSystem from "expo-file-system/legacy";


const BASE_URL = "https://saavn.sumit.co/api";
const placeholder = require("../../assets/placeholder.png");

export type SaavnSong = {
  id: string;
  name: string;
  primaryArtists?: string;
  artists?: { primary?: { name: string }[] };
  image?: { quality: string; url: string }[];
  downloadUrl?: { quality: string; url: string }[];
};

export type SaavnAlbum = {
  id: string;
  name: string;
  year?: string;
  image?: { quality: string; url: string }[];
};

// ---------- HTML ----------
export function decodeHtml(text?: string) {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/&quot;/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "")
    .replace(/&gt;/g, "");
}

// ---------- SEARCH ----------
export async function searchSongs(query: string) {
  const res = await fetch(
    `${BASE_URL}/search/songs?query=${encodeURIComponent(query)}`
  );
  const json = await res.json();
  return { results: json?.data?.results ?? [] };
}

export async function searchAlbums(query: string) {
  const res = await fetch(
    `${BASE_URL}/search/albums?query=${encodeURIComponent(query)}`
  );
  const json = await res.json();
  return { results: json?.data?.results ?? [] };
}

// ---------- SONG FETCH ----------
export async function getArtistSongs(artistId: string) {
  const res = await fetch(`${BASE_URL}/artists/${artistId}/songs`);
  const json = await res.json();
  return json?.data?.songs ?? [];
}

export async function getAlbumSongs(albumId: string) {
  const res = await fetch(`${BASE_URL}/albums?id=${albumId}`);
  const json = await res.json();
  return json?.data?.songs ?? [];
}

// ---------- HELPERS ----------
export function getArtistName(song: SaavnSong) {
  if (song.primaryArtists) return decodeHtml(song.primaryArtists);
  if (song.artists?.primary?.length)
    return decodeHtml(song.artists.primary.map(a => a.name).join(", "));
  return "Unknown Artist";
}

export function getCleanSongName(name?: string) {
  return decodeHtml(name);
}

export function getBestImage(item: { image?: { url: string }[] }) {
  if (!item.image || item.image.length === 0) {
    return Image.resolveAssetSource(placeholder).uri;
  }
  return item.image[item.image.length - 1].url;
}

// ---------- AUDIO URL ----------
export function getBestAudioUrl(song: SaavnSong) {
  if (!song.downloadUrl?.length) return "";
  return song.downloadUrl[song.downloadUrl.length - 1].url;
}

// ---------- DOWNLOAD + OFFLINE ----------
const DOWNLOAD_DIR =
  ((FileSystem as any).documentDirectory ?? (FileSystem as any).cacheDirectory) + "downloads/";

export async function ensureDownloadDir() {
  const dir = await FileSystem.getInfoAsync(DOWNLOAD_DIR);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(DOWNLOAD_DIR, { intermediates: true });
  }
}

export function getLocalSongPath(song: SaavnSong) {
  return DOWNLOAD_DIR + song.id + ".mp3";
}

export async function isSongDownloaded(song: SaavnSong) {
  const path = getLocalSongPath(song);
  const info = await FileSystem.getInfoAsync(path);
  return info.exists;
}

export async function downloadSong(song: SaavnSong) {
  try {
    await ensureDownloadDir();

    const url = getBestAudioUrl(song);
    if (!url) return null;

    const localPath = getLocalSongPath(song);
    const info = await FileSystem.getInfoAsync(localPath);
    if (info.exists) return localPath;

    const result = await FileSystem.downloadAsync(url, localPath);
    return result.uri;
  } catch (e) {
    console.log("Download error:", e);
    return null;
  }
}
