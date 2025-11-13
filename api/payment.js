import Airtable from 'airtable';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, mobile, month, amount, refId, txnId } = req.body;

  if (!name || !mobile || !month || !amount || !refId || !txnId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base('appBDoGBn4HTMX1zM');

    await base('rd-payment').create({
      Name: name,
      Mobile: mobile,
      Month: month,
      Amount: amount,
      RefID: refId,
      TransactionID: txnId,
      Status: 'Success'
    });

    res.status(200).json({ success: true, message: 'Payment recorded!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
