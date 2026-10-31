# Third-party notices

This website is customized from [xyjoey/PRISM](https://github.com/xyjoey/PRISM),
upstream revision `f2748db` (PRISM 1.3.3). Its MIT license is preserved in
[LICENSE](LICENSE), and the website retains its PRISM attribution.

## BibTeX parser

`src/lib/vendor/bibtex-parse-js.cjs` is an **unmodified, byte-for-byte copy** of
`bibtexParse.js` from `bibtex-parse-js` version **0.0.24**, the version originally
used by this PRISM checkout. The original MIT license is preserved alongside it
in [LICENSE.bibtex-parse-js](src/lib/vendor/LICENSE.bibtex-parse-js).

Source: [ORCID/bibtexParseJs](https://github.com/ORCID/bibtexParseJs).

SHA-256 of the preserved parser module:
`bfdebc92c299a6955e81781e9cf9482bff6637cd33268d4f5ce0aef9aa3494ac`.

The upstream npm package declares AVA and XML tooling as production dependencies,
although its parser module does not import either. Keeping the small parser
module locally preserves the existing parsing behavior without installing that
unused dependency tree. No parser algorithm was rewritten during cleanup.

When updating the parser, retain its copyright notices and license, and run
`npm run check:bibtex` plus the regular build and export checks.
