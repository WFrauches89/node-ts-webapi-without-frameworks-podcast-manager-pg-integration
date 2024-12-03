import fs from 'fs';
import path from 'path';
import { PodcastModel } from '../models/PodcastModelDTO';
import pool from '../database/pool';

export const getAllPodcastsRepository = async (
  param?: string,
): Promise<PodcastModel[]> => {
  const query = `
    SELECT * FROM podcasts
    WHERE active = TRUE
    ${param ? `AND podcast_name LIKE $1` : ''};
  `;
  const values = param ? [`%${param}%`] : [];

  const { rows } = await pool.query(query, values);
  return rows;
};

export const createPodcastRepository = async (
  newPodcast: PodcastModel,
): Promise<PodcastModel> => {
  const query = `
    INSERT INTO podcasts (video_id, podcast_name, episode, categories)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [
    newPodcast.videoId,
    newPodcast.podcastName,
    newPodcast.episode,
    newPodcast.categories,
  ];
  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error) {
      if (error.code === '23505') {
        throw new Error('Cannot insert podcast: videoId already exists');
      }
    }
    throw error;
  }
};

export const updatePodcastByIDRepository = async (
  id: string,
  updatedPodcast: PodcastModel,
): Promise<PodcastModel | null> => {
  const query = `
    UPDATE podcasts
    SET podcast_name = $1, episode = $2, categories = $3, active = $4, updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *;
  `;
  const values = [
    updatedPodcast.podcastName,
    updatedPodcast.episode,
    updatedPodcast.categories,
    updatedPodcast.active,
    id,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

export const partialUpdatePodcastRepository = async (
  id: string,
  partialData: Partial<PodcastModel>,
): Promise<PodcastModel | null> => {
  const setClauses: string[] = [];
  const values: any[] = [];

  if (partialData.podcastName) {
    setClauses.push(`podcast_name = $${setClauses.length + 1}`);
    values.push(partialData.podcastName);
  }
  if (partialData.episode) {
    setClauses.push(`episode = $${setClauses.length + 1}`);
    values.push(partialData.episode);
  }
  if (partialData.categories) {
    setClauses.push(`categories = $${setClauses.length + 1}`);
    values.push(partialData.categories);
  }
  if (partialData.active !== undefined) {
    setClauses.push(`active = $${setClauses.length + 1}`);
    values.push(partialData.active);
  }

  if (setClauses.length === 0) {
    return null;
  }

  const query = `
    UPDATE podcasts
    SET ${setClauses.join(', ')}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${setClauses.length + 1}
    RETURNING *;
  `;
  values.push(id);

  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

export const deletePodcastRepository = async (id: string): Promise<boolean> => {
  const query = `
    DELETE FROM podcasts
    WHERE id = $1
    RETURNING *;
  `;
  const { rowCount } = await pool.query(query, [id]);
  return (rowCount ?? 0) > 0;
};
