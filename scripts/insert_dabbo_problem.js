const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../react-app/src/pages/WorkDetail.jsx');
let c = fs.readFileSync(targetFile, 'utf8');

const target = 'THE SENSORY NOSTALGIA INSIGHT';
const idx = c.indexOf(target);
if (idx === -1) {
  console.error('Target not found!');
  process.exit(1);
}

const splitPart = c.indexOf(') : (', idx);
if (splitPart === -1) {
  console.error('Split part not found!');
  process.exit(1);
}

const dabboProblem = `) : isDabbo ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE MADRID STREET FOOD CHALLENGE</div>
                  <h2>Reinventing casual street dining into a cult-favorite culinary destination.</h2>
                </div>
                <p>Moving beyond generic fast-food paper wraps to an iconic, retro-modern takeaway packaging architecture.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Madrid&apos;s bustling street food landscape demanded an identity that honors Spanish culinary warmth while executing with razor-sharp Scandinavian typographic restraint.</strong></p>
                  <p>Dabbo needed a modular takeaway architecture capable of keeping artisanal grilled sausages piping hot, containing condiments without sogginess, and pairing seamlessly with high-volume specialty roasted espresso on the go.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// PACKAGING FUNCTIONALITY INSIGHT</div>
                  <p>&ldquo;Street food packaging must perform as a mobile billboard. When custom folding clamshells lock securely and carry bold Madrid crimson branding, customers proudly carry the brand across the city plazas.&rdquo;</p>
                </div>
              </div>
            </>
          `;

c = c.slice(0, splitPart) + dabboProblem + c.slice(splitPart);
fs.writeFileSync(targetFile, c, 'utf8');
console.log('Successfully inserted Dabbo problem section!');

