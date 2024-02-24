import { PrisonerConstructor } from './Prisoner';
import {readdirSync} from 'fs';

// relative to the root of the project
const prisonerSources = [
  './Prisoners',
  './PersonalPrisoners'
];

export function loadPrisoners() {
  const prisoners: Array<PrisonerConstructor> = [];
  prisonerSources.forEach(source => {
    const files = readdirSync(source);
    files.forEach(file => {
      if (file.endsWith('.ts') && !file.startsWith('hide.')) {
        const prisoner: PrisonerConstructor = require(`@/${source}/${file}`).default;
        prisoners.push(prisoner);
      }
    });
  });
  return prisoners;
}
