async function main() {
  const res = await fetch('https://github.com/users/siddharthkmaharana/contributions', {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  const html = await res.text();

  const theadMatch = html.match(/<thead>([\s\S]*?)<\/thead>/i);
  const re = /<td([^>]*)>([\s\S]*?)<\/td>/g;
  let m;
  const monthHeaders = [];
  let currentWeek = 0;

  if (theadMatch) {
    while ((m = re.exec(theadMatch[1])) !== null) {
      const text = m[2].replace(/<[^>]+>/g, '').trim().split(/\s+/).pop();
      const csMatch = m[1].match(/colspan="(\d+)"/);
      const span = csMatch ? parseInt(csMatch[1], 10) : 1;
      if (text && text !== 'Week' && text !== 'Day') {
        monthHeaders.push({ name: text, col: currentWeek });
      }
      currentWeek += span;
    }
  }

  console.log('Month headers:', monthHeaders);

  // Extract all cells
  const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
  const tooltips = {};
  let tMatch;
  while ((tMatch = tooltipRegex.exec(html)) !== null) {
    tooltips[tMatch[1]] = tMatch[2].trim();
  }

  const anyCellRegex = /<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
  const allTds = [...html.matchAll(anyCellRegex)];

  const cells = [];
  for (const m of allTds) {
    const tag = m[0];
    const dateMatch = tag.match(/data-date="([^"]+)"/);
    const idMatch = tag.match(/id="contribution-day-component-(\d+)-(\d+)"/);
    const levelMatch = tag.match(/data-level="([^"]+)"/);
    if (dateMatch && idMatch && levelMatch) {
      const row = parseInt(idMatch[1], 10);
      const col = parseInt(idMatch[2], 10);
      const date = dateMatch[1];
      const level = parseInt(levelMatch[1], 10);
      const tip = tooltips[`contribution-day-component-${row}-${col}`] || '';
      let count = 0;
      const countMatch = tip.match(/^(\d+)\s+contribution/i);
      if (countMatch) {
        count = parseInt(countMatch[1], 10);
      }
      // Formatted date: "May 12, 2026"
      const parts = date.split('-');
      const dObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      const formattedDate = dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      cells.push({ row, col, date, formattedDate, level, count, tip });
    }
  }

  const maxCol = Math.max(...cells.map(c => c.col));
  const weeks = [];
  for (let c = 0; c <= maxCol; c++) {
    const colCells = cells.filter(cell => cell.col === c).sort((a, b) => a.row - b.row);
    weeks.push(colCells);
  }

  // Calculate total contributions
  let totalCount = 0;
  cells.forEach(c => totalCount += c.count);
  console.log('Sum of counts from days:', totalCount);

  const totalMatch = html.match(/([\d,]+)\s+contributions\s+in the last year/i);
  const totalHeader = totalMatch ? totalMatch[1].replace(/,/g, '') : totalCount;

  const result = {
    total: totalHeader,
    monthHeaders,
    weeks,
  };

  const fs = await import('fs');
  fs.writeFileSync('src/github-real-streak.json', JSON.stringify(result, null, 2));
  console.log('Saved src/github-real-streak.json successfully!');
}

main().catch(console.error);
