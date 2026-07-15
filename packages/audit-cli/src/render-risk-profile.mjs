export function renderRiskProfile(profile, { width = 10 } = {}) {
  return profile.dimensions.map(({ name, level, explanation }) => {
    const filled = Math.round((level / 5) * width);
    const bar = `${'█'.repeat(filled)}${'░'.repeat(width - filled)}`;
    return `${name.padEnd(24)} ${bar} ${level}/5${explanation ? `  ${explanation}` : ''}`;
  }).join('\n');
}
