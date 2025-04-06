// controllers/paymentController.js
const crypto = require('crypto');
const axios = require('axios');

exports.createPayment = async (req, res) => {
  const { amount, orderInfo } = req.body;

  var accessKey = 'F8BBA842ECF85';
  var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  var partnerCode = 'MOMO';
  var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  var requestType = "payWithMethod";
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = '';
  var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
  var orderGroupId = '';
  var autoCapture = true;
  var lang = 'vi';

  // Tạo rawSignature trước khi ký
  var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  // HMAC SHA256 signature
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = {
    partnerCode,
    partnerName: 'Test',
    storeId: 'MomoTestStore',
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId: '',
    signature,
  };

  try {
    // Gửi request đến MoMo API
    const response = await axios.post(
      'https://test-payment.momo.vn/v2/gateway/api/create',
      requestBody
    );

    // Trả về URL thanh toán
    res.json({ payUrl: response.data.payUrl });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'Thanh toán thất bại' });
  }
};

exports.handleReturnUrl = (req, res) => {
  res.send('Giao dịch hoàn tất! Kiểm tra IPN để biết trạng thái đơn hàng.');
};

exports.handleIPN = (req, res) => {
  const { resultCode, orderId } = req.body;
  console.log('IPN Response:', req.body);

  if (resultCode === 0) {
    console.log(`Giao dịch thành công cho orderId: ${orderId}`);
    // Cập nhật trạng thái đơn hàng trong DB
  } else {
    console.log(`Giao dịch thất bại với orderId: ${orderId}`);
  }

  res.status(200).send('IPN received');
};
