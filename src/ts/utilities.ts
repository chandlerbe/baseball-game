import { Player } from "./player";

export enum typeOfPitches {
  Strike,
  Ball,
  BallInPlay,
  HitByPitch
}
export enum typeOfHits {
  Single,
  Double,
  Triple,
  HomeRun,
  Error
}
export enum typeOfOuts {
  FoulBall,
  GroundOut,
  FlyOut,
  PopOut
}

function shuffleArray(data: any[]): void {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
}

export function getRandomNumber(
  minValue: number = 10,
  maxValue: number = 30
): number {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}

export function getHit(batter: Player): typeOfHits {
  let hits = [];

  for (var i = 0; i < batter.hitForAverageAbility; i++) {
    hits.push(typeOfHits.Single);
  }
  for (var i = 0; i < batter.hitForAverageAbility / 4; i++) {
    hits.push(typeOfHits.Double);
  }
  for (var i = 0; i < batter.hitForAverageAbility / 10; i++) {
    hits.push(typeOfHits.HomeRun);
  }
  for (var i = 0; i < batter.hitForAverageAbility / 12; i++) {
    hits.push(typeOfHits.Triple);
  }
  for (var i = 0; i < batter.hitForAverageAbility / 15; i++) {
    hits.push(typeOfHits.Error);
  }

  shuffleArray(hits);
  return hits[getRandomNumber(0, hits.length - 1)];
}

export function getOut(): typeOfOuts {
  let outs = [];

  for (let i = 0; i < 20; i++) {
    outs.push(typeOfOuts.FlyOut);
  }
  for (let i = 0; i < 5; i++) {
    outs.push(typeOfOuts.FoulBall);
  }
  for (let i = 0; i < 20; i++) {
    outs.push(typeOfOuts.GroundOut);
  }
  for (let i = 0; i < 10; i++) {
    outs.push(typeOfOuts.PopOut);
  }

  shuffleArray(outs);
  return outs[getRandomNumber(0, outs.length - 1)];
}

export function getPitch(pitcher: Player): typeOfPitches {
  let pitches = [];

  for (let i = 0; i < pitcher.pitchingAbility; i++) {
    pitches.push(typeOfPitches.Strike);
  }
  for (
    let i = 0;
    i < pitcher.pitchingAbility - pitcher.pitchingAbility / 3;
    i++
  ) {
    pitches.push(typeOfPitches.Ball);
  }
  for (let i = 0; i < 5; i++) {
    pitches.push(typeOfPitches.BallInPlay);
  }
  for (let i = pitches.length; i < 100; i++) {
    pitches.push(typeOfPitches.HitByPitch);
  }

  shuffleArray(pitches);
  return pitches[getRandomNumber(0, pitches.length - 1)];
}
