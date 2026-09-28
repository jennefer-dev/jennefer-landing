import {Composition} from 'remotion';
import {HeroMotion} from './HeroMotion';

export const RemotionRoot = () => (
  <Composition
    id="JenneferHero"
    component={HeroMotion}
    durationInFrames={450}
    fps={30}
    width={1200}
    height={880}
  />
);
