let revenue = [
  [190, 140, 1926, 14, 142],
  [325, 19, 293, 1491, 162],
  [682, 14, 852, 56, 659],
  [829, 140, 609, 120, 87],
];

let expenses = [
  [120, 65, 890, 54, 430],
  [300, 10, 23, 802, 235],
  [50, 299, 1290, 12, 145],
  [67, 254, 89, 129, 76]
]

let commission = [];

for (i = 0; i < revenue.length; i++) {
  commission.push([]);
  for (j = 0; j < revenue[0].length; j++) {
    if (revenue[i][j] > expenses[i][j]) {

      commission[i].push((revenue[i][j] - expenses[i][j]) * .062)
    } else {
      commission[i].push(0)
    }
  }
}

commission.reduce((r, a) => {
  a.forEach((b, i) => {
    r[i] = Math.trunc((r[i]) || 0, 4) + b;
  })
  return r;
})

console.log(commission[0]);