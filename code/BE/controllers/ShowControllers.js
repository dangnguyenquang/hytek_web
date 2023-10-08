const productInfo = require("../models/productInfo");

class showControllers {
    show (req, res) {
        var result = 0;
        var message = '';
        var total_data = 0;
        var resjson = {};

        productInfo.find({}, (err, data) => {
            if (err) {
              console.error('Lỗi khi lấy dữ liệu:', err);
              result = 0;
              message = `Lỗi khi lấy dữ liệu: ${err}`;
              total_data = 0;
              data = [];
            } else {
              console.log(' Lấy dữ liệu thành công từ collection productInfo');
              result = 1;
              message = `Thành công`;
              total_data = data.length;
            }
            resjson = {
                result: result,
                message: message,
                total_data: total_data,
                data: data,
            }
        });
        
        res.json(resjson);
    }

}

module.exports = new showControllers();