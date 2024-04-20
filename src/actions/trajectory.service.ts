'use server';

import { getMongoDb } from '@/src/lib/mongodb';
import {
  transformMetricResult,
  transformTrajectoriesDataResult,
  transformTrajectoriesEuclideanMetricsResult,
  transformTrajectoriesHeadersResult,
  transformTrajectoryResult,
} from '@/src/lib/transformer';
import type {
  TrajectoryData,
  TrajectoryDataRaw,
  TrajectoryEuclideanMetrics,
  TrajectoryEuclideanMetricsRaw,
  TrajectoryHeaderRaw,
} from '@/types/main';

export const getTrajectoriesHeader = async () => {
  const mongo = await getMongoDb();

  const trajectoriesHeaderResult = await mongo
    .collection('header')
    .find<TrajectoryHeaderRaw>({})
    .sort({ recording_date: -1 })
    .toArray();

  return transformTrajectoriesHeadersResult(trajectoriesHeaderResult);
};

export const getTrajectoriesData = async () => {
  const mongo = await getMongoDb();

  const trajectoriesDataResult = await mongo
    .collection('data')
    .find<TrajectoryDataRaw>({})
    .sort({ recording_date: -1 })
    .toArray();

  if (!trajectoriesDataResult) {
    return {} as TrajectoryData[];
  }

  return transformTrajectoriesDataResult(trajectoriesDataResult);
};

export const getTrajectoriesEuclideanMetrics = async () => {
  const mongo = await getMongoDb();

  const trajectoriesEuclideanMetricsResult = await mongo
    .collection('metrics')
    .find<TrajectoryEuclideanMetricsRaw>({})
    .sort({ recording_date: -1 })
    .toArray();

  return transformTrajectoriesEuclideanMetricsResult(
    trajectoriesEuclideanMetricsResult,
  );
};

export const getTrajectoryById = async (id: string) => {
  const mongo = await getMongoDb();

  const trajectoryResult = await mongo
    .collection('data')
    .find<TrajectoryDataRaw>({ trajectory_header_id: id })
    .next();

  if (!trajectoryResult) {
    return {} as TrajectoryData;
  }

  return transformTrajectoryResult(trajectoryResult);
};

export const getMetricsById = async (id: string) => {
  const mongo = await getMongoDb();

  const metricsResult = await mongo
    .collection('metrics')
    .find<TrajectoryEuclideanMetricsRaw>({ trajectory_header_id: id })
    .next();

  if (!metricsResult) {
    return {} as TrajectoryEuclideanMetrics;
  }

  return transformMetricResult(metricsResult);
};
