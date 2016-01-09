let d3 = require('d3');

export function uniques(data, name) {
  let uniques = [];
  data.forEach((d) => {
    if (uniques.indexOf(name(d)) < 0) {
      uniques.push(name(d));
    }
  });
  return uniques;
}

export function nameId(data, name) {
  let uniqueNames = uniques(data, name);
  return d3.scale.ordinal()
  .domain(uniqueNames)
  .range(d3.range(uniqueNames.length));
}

export function binPerName (data, name) {
   let nameIds = nameId(data, name);
   let histogram = d3.layout.histogram()
           .bins(nameIds.range())
           .value((d) => nameIds(name(d)));

   return histogram(data);
}

export const color = d3.scale.ordinal().range(['#EF3B39', '#FFCD05', '#69C9CA', '#666699', '#CC3366',
  '#0099CC', '#999999', '#FBF5A2', '#6FE4D0', '#CCCB31', '#009966', '#C1272D', '#F79420', '#445CA9',
  '#402312', '#272361', '#A67C52', '#016735', '#F1AAAF','#A0E6DA', '#C9A8E2', '#F190AC', '#7BD2EA',
  '#DBD6B6']);

export function fixateColors (data) {
  color.domain(uniques(data, (d) => d.from));
} 

export function arcLabels(text, radius) {
  return function (selection) {
    selection.append('text')
      .text(text)
      .attr('text-anchor', (d) => tickAngle(d) > 100 ? 'end' : 'start')
      .attr('transform', (d) => {
        let degrees = tickAngle(d);
        let turn = `rotate(${degrees}) translate(${radius(d) + 10}, 0)`;
        if (degrees > 100) {
          turn += `rotate(180)`;
        }
        return turn;
      });
  }
}

export function tickAngle (d) {
  let midAngle = (d.endAngle - d.startAngle) / 2;
  let degrees = (midAngle + d.startAngle) / Math.PI * 180 - 90;
  return degrees;
}
