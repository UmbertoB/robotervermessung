'use client';

import React, { useEffect } from 'react';

import { TrajectoryInfo } from '@/src/app/trajectories/components/TrajectoryInfo';
import { SegmentInfo } from '@/src/app/trajectories/components/SegmentInfo';
import { TrajectoryPlot } from '@/src/app/trajectories/components/TrajectoryPlot';
import { useTrajectory } from '@/src/providers/trajectory.provider';
import type {
  BahnPoseIst,
  BahnTwistIst,
  BahnAccelIst,
  TrajectoryData,
  TrajectoryDFDMetrics,
  TrajectoryDTWJohnenMetrics,
  TrajectoryDTWMetrics,
  TrajectoryEuclideanMetrics,
  TrajectoryLCSSMetrics,
  BahnPositionSoll,
  BahnOrientationSoll,
} from '@/types/main';

type TrajectoryPageProps = {
  currentTrajectory: TrajectoryData;
  currentBahnPoseIst: BahnPoseIst;
  currentBahnTwistIst: BahnTwistIst;
  currentBahnAccelIst: BahnAccelIst;
  currentBahnPositionSoll: BahnPositionSoll;
  currentBahnOrientationSoll: BahnOrientationSoll;
  currentDTWMetrics: TrajectoryDTWMetrics;
  currentEuclideanMetrics: TrajectoryEuclideanMetrics;
  currentDTWJohnenMetrics: TrajectoryDTWJohnenMetrics;
  currentDFDMetrics: TrajectoryDFDMetrics;
  currentLCSSMetrics: TrajectoryLCSSMetrics;
};

export function TrajectoryWrapper({
  currentTrajectory,
  currentBahnPoseIst,
  currentBahnTwistIst,
  currentBahnAccelIst,
  currentBahnPositionSoll,
  currentBahnOrientationSoll,
  currentEuclideanMetrics,
  currentDTWMetrics,
  currentDTWJohnenMetrics,
  currentDFDMetrics,
  currentLCSSMetrics,
}: TrajectoryPageProps) {
  const {
    setCurrentTrajectory,
    setCurrentBahnPoseIst,
    setCurrentBahnTwistIst,
    setCurrentBahnAccelIst,
    setCurrentBahnPositionSoll,
    setCurrentBahnOrientationSoll,
    setCurrentEuclidean,
    setCurrentDTWJohnen,
    setCurrentLCSS,
    setCurrentDTW,
    setCurrentDFD,
  } = useTrajectory();

  useEffect(() => {
    setCurrentDTW(currentDTWMetrics);
    setCurrentTrajectory(currentTrajectory);
    setCurrentEuclidean(currentEuclideanMetrics);
    setCurrentDTWJohnen(currentDTWJohnenMetrics);
    setCurrentDFD(currentDFDMetrics);
    setCurrentLCSS(currentLCSSMetrics);
    setCurrentBahnPoseIst(currentBahnPoseIst);
    setCurrentBahnTwistIst(currentBahnTwistIst);
    setCurrentBahnAccelIst(currentBahnAccelIst);
    setCurrentBahnPositionSoll(currentBahnPositionSoll);
    setCurrentBahnOrientationSoll(currentBahnOrientationSoll);
  }, []);

  const isSegment = currentTrajectory.segmentId && currentTrajectory.segmentId.includes('_');
  
  return (
    <>
      {isSegment ? <SegmentInfo /> : <TrajectoryInfo />}
      <TrajectoryPlot />
    </>
  );
}