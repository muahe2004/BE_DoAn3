// controllers/paymentController.js
const crypto = require('crypto');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const nguoiDung_Model = require("../models/nguoiDung");
const hoaDonNap_Model = require("../models/hoaDonNap");
const { error } = require('console');

exports.createPayment = async (req, res) => {
  const { amount, orderInfo } = req.body;
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Thiếu token xác thực' });

  let maNguoiDung;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    maNguoiDung = decoded.id;
  } catch (err) {
    return res.status(403).json({ message: 'Token không hợp lệ' });
  }

  var accessKey = 'F8BBA842ECF85';
  var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  var partnerCode = 'MOMO';
  var redirectUrl = 'http://localhost:5173/payment-done';
  var ipnUrl = 'https://e1aa-2402-800-6117-5626-111e-28db-123a-d7e4.ngrok-free.app/payment/ipn';
  var requestType = "payWithMethod";
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  // var extraData = '';
  var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
  var orderGroupId = '';
  var autoCapture = true;
  var lang = 'vi';

  const extraData = Buffer.from(JSON.stringify({ maNguoiDung })).toString('base64');

  var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

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
    res.status(500).json({ message: 'Thanh toán thất bại' });
  }
};

exports.handleReturnUrl = (req, res) => {
  res.send('Giao dịch hoàn tất! Kiểm tra IPN để biết trạng thái đơn hàng.');
};

exports.handleIPN = (req, res) => {
  const { resultCode, orderId, amount, transId, extraData } = req.body;
  // console.log('IPN Response:', req.body);

  if (resultCode === 0) {
    // console.log(`Giao dịch thành công - orderId: ${orderId}, amount: ${amount}, transId: ${transId}`);

    // Giải mã extraData để lấy mã người dùng
    const extra = JSON.parse(Buffer.from(extraData, 'base64').toString());
    const maNguoiDung = extra.maNguoiDung;

    const payMethod = "Momo E-Wallet";
    const payStatus = "Thành công";
    const payNote = null;


    // Thêm hóa đơn vào csdl
    /*
      maHoaDon,
      maNguoiDung,
      soTien,
      phuongThucNap (Momo E-Wallet),
      trangThai (Thành công),
      ghiChu (null cũng dc),
      updateAt (null),
      createdAt (default rồi)
    */
    console.log("Mã hóa đơn: ", orderId);
    console.log("Mã người dùng: ",maNguoiDung);
    console.log("Số tiền: ", amount);
    console.log("Phương thức nạp: ", payMethod);
    console.log("Trạng thái: ", payStatus);
    console.log("Ghi chú: ", payNote);

    const dataHoaDonNap = {
      maHoaDon: orderId,
      maNguoiDung: maNguoiDung,
      soTien: amount,
      phuongThucNap: payMethod,
      trangThai: payStatus,
      ghiChu: payNote
    };

    hoaDonNap_Model.create(dataHoaDonNap, (err, result) => {
      if (err) {
        console.error('Lỗi khi thêm hóa đơn nạp tiền!', err);
      } else {
        console.log(`Thêm hóa đơn nạp tiền ${orderId} thành công!`);
      }
    })

    // cập nhật số dư
    nguoiDung_Model.deposit(amount, maNguoiDung, (err, result) => {
      if (err) {
        console.error('Lỗi cập nhật số dư:', err);
      } else {
        console.log(`Cập nhật số dư thành công cho người dùng: ${maNguoiDung}`);
      }
    });

  } else {
    console.log(`Giao dịch thất bại - orderId: ${orderId}, resultCode: ${resultCode}`);
  }

  res.status(200).send('IPN received');
};