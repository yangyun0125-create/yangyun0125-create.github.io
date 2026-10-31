// Synthetic regression fixtures only. They are never written to site content.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

const root = process.cwd();
const privateDir = path.join(root, '.sites-runtime');
fs.mkdirSync(privateDir, { recursive: true });
const temporary = fs.mkdtempSync(path.join(privateDir, 'bibtex-check-'));
const load = createRequire(import.meta.url);

try {
  for (const name of ['bibtexParser', 'bibtexInline', 'config', 'i18n/config']) {
    const filename = `src/lib/${name}.ts`;
    const output = path.join(temporary, `src/lib/${name}.js`);
    const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
      fileName: filename,
    });
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, compiled.outputText);
  }
  const vendor = path.join(temporary, 'src/lib/vendor');
  fs.mkdirSync(vendor, { recursive: true });
  fs.copyFileSync('src/lib/vendor/bibtex-parse-js.cjs', path.join(vendor, 'bibtex-parse-js.cjs'));
  const { parseBibTeX } = load(path.join(temporary, 'src/lib/bibtexParser.js'));
  const raw = load(path.join(vendor, 'bibtex-parse-js.cjs'));
  assert.deepEqual(parseBibTeX('% Comment-only library\n'), []);

  const fixture = String.raw`
@article{fixtureOlder,
  author = {Fixture, A and Fixture, B},
  title = {Synthetic {nested} \textit{title}},
  journal = {Parser regression fixture, not a publication},
  year = {2024}, month = {jan}, selected = {true},
  pdf = {/papers/parser-fixture.pdf},
  abstract = {Fixture with {nested} braces.}
}
@unpublished{fixtureNewer,
  author = {测试作者 and Fixture, C},
  title = {Unicode fixture — not a publication},
  year = {2026}, month = {feb}
}`;
  for (const locale of ['en', 'zh']) {
    const items = parseBibTeX(fixture, locale);
    assert.equal(items.length, 2);
    assert.equal(items[0].id, 'fixtureNewer');
    assert.equal(items[0].type, 'preprint');
    assert.equal(items[0].authors[0].name, '测试作者');
    const older = items[1];
    assert.equal(older.type, 'journal');
    assert.equal(older.selected, true);
    assert.equal(older.pdfUrl, '/papers/parser-fixture.pdf');
    assert.equal(older.authors[0].name, 'A Fixture');
    assert.ok(older.title.includes('nested') && older.title.includes('title'));
    assert.ok(older.abstract.includes('nested'));
    const roundTrip = raw.toJSON(older.bibtex);
    assert.equal(roundTrip[0].citationKey, 'fixtureOlder');
    assert.equal(roundTrip[0].entryTags.pdf, '/papers/parser-fixture.pdf');
    assert.ok(!Object.hasOwn(roundTrip[0].entryTags, 'selected'));
    assert.ok(Array.isArray(parseBibTeX(fs.readFileSync('content/publications.bib', 'utf8'), locale)));
  }
  console.log('BibTeX checks passed: empty library, nested formatting, Unicode authors, year sorting, entry types, selected flags, PDF links and citation round-trip in EN/ZH.');
} finally {
  const resolved = path.resolve(temporary);
  if (!resolved.startsWith(`${path.resolve(privateDir)}${path.sep}bibtex-check-`)) throw new Error('Unexpected temporary directory');
  fs.rmSync(resolved, { recursive: true, force: true });
}
