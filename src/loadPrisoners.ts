import { PrisonerConstructor } from './Prisoner';
import {readdirSync} from 'fs';

type PrisonerConstructorAndSource = {
  source: string;
  prisoner: PrisonerConstructor;
};

// relative to the root of the project
const prisonerSources = [
  './Prisoners',
  './PersonalPrisoners'
];

export function loadPrisoners() {
  const prisoners: Array<PrisonerConstructorAndSource> = [];
  prisonerSources.forEach(source => {
    const files = readdirSync(source);
    files.forEach(file => {
      if (file.endsWith('.ts') && !file.startsWith('hide.')) {
        const prisoner: PrisonerConstructor = require(`@/${source}/${file}`).default;
        prisoners.push({
          source: `${source}/${file}`,
          prisoner
        });
      }
    });
  });
  return prisoners;
}
