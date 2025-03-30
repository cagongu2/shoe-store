const crypto = require("crypto");
const https = require("https");

exports.createPayment = async (req, res) => {
    try {
        const partnerCode = process.env.MOMO_PARTNER_CODE;
        const accessKey = process.env.MOMO_ACCESS_KEY;
        const requestId = partnerCode + new Date().getTime();
        const { amount } = req.body;
        const orderId = requestId;
        const orderInfo = "Thanh toán với MoMo";
        const redirectUrl = process.env.MOMO_REDIRECT_URL;
        const ipnUrl = process.env.MOMO_IPN_URL;
        const requestType = "captureWallet";
        const secretKey = process.env.MOMO_SECRET_KEY;
        const extraData = "";

        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto.createHmac("sha256", secretKey)
            .update(rawSignature)
            .digest("hex");

        const requestBody = JSON.stringify({
            partnerCode,
            accessKey,
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            extraData,
            requestType,
            signature,
            lang: "vi"
        });

        const options = {
            hostname: "test-payment.momo.vn",
            port: 443,
            path: "/v2/gateway/api/create",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(requestBody),
            }
        };

        const momoReq = https.request(options, (momoRes) => {
            let data = "";

            momoRes.on("data", (chunk) => {
                data += chunk;
            });

            momoRes.on("end", () => {
                const responseData = JSON.parse(data);
                res.json({ payUrl: responseData.payUrl });
            });
        });
        momoReq.on("error", (error) => {
            console.error("Lỗi khi gửi request:", error);
            res.status(500).json({ message: "Lỗi khi tạo thanh toán" });
        });

        momoReq.write(requestBody);
        momoReq.end();
    } catch (error) {
        console.error("Lỗi hệ thống:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
}