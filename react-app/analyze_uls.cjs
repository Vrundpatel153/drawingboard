const fs = require('fs');
const html = fs.readFileSync('src/pages/Home.jsx', 'utf8');
const uls = html.match(/<ul[^>]*flex-direction:row[^>]*>/gi);
if (uls) {
    uls.forEach((ul, i) => {
        const start = html.indexOf(ul);
        const end = html.indexOf('</ul>', start);
        const fullUl = html.substring(start, end + 5);
        if (fullUl.includes('Client Satisfaction') || fullUl.includes('framerusercontent.com') || fullUl.includes('Brands')) {
            console.log(`UL ${i} matches search criteria. Context:`);
            console.log(html.substring(Math.max(0, start - 200), start));
        }
    });
}
