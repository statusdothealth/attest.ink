export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const testCases = [
    { zipCode: '90210', location: 'Los Angeles', expectedRate: 0.095 },
    { zipCode: '94105', location: 'San Francisco', expectedRate: 0.0875 },
    { zipCode: '92101', location: 'San Diego', expectedRate: 0.0775 },
    { zipCode: '95814', location: 'Sacramento', expectedRate: 0.0725 },
    { zipCode: '10001', location: 'New York', expectedRate: 0 },
    { zipCode: '', location: 'No ZIP', expectedRate: 0 },
  ];

  const CA_TAX_RATES = {
    default: 0.0725,
    '90': 0.095,
    '91': 0.095,
    '92': 0.0775,
    '93': 0.0875,
    '94': 0.0875,
    '95': 0.0725,
    '96': 0.0725,
    '97': 0.0775,
    '98': 0.0725,
    '99': 0.0725
  };

  function getCaliforniaTaxRate(zipCode) {
    if (!zipCode || zipCode.length < 2) return 0;
    
    const prefix = zipCode.substring(0, 2);
    const numPrefix = parseInt(prefix);
    
    if (numPrefix >= 90 && numPrefix <= 96) {
      return CA_TAX_RATES[prefix] || CA_TAX_RATES.default;
    }
    
    return 0;
  }

  const results = testCases.map(test => {
    const calculatedRate = getCaliforniaTaxRate(test.zipCode);
    const subtotal = 20.00;
    const tax = subtotal * calculatedRate;
    const total = subtotal + tax;
    
    return {
      zipCode: test.zipCode || '(none)',
      location: test.location,
      expectedRate: (test.expectedRate * 100).toFixed(2) + '%',
      calculatedRate: (calculatedRate * 100).toFixed(2) + '%',
      correct: calculatedRate === test.expectedRate,
      subtotal: '$' + subtotal.toFixed(2),
      tax: '$' + tax.toFixed(2),
      total: '$' + total.toFixed(2)
    };
  });

  const allCorrect = results.every(r => r.correct);

  res.status(200).json({
    success: allCorrect,
    message: allCorrect ? 'All tax calculations are correct!' : 'Some tax calculations are incorrect',
    testResults: results
  });
}