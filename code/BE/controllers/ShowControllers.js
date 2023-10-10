const productInfo = require("../models/productInfo");

class showControllers {
    show (req, res) {
      productInfo.find({})
      .then((data) => {
        console.log('Lấy dữ liệu thành công từ collection productInfo');
        const result = 1;
        const message = 'Thành công';
        const total_data = data.length;
        
        const resjson = {
          result: result,
          message: message,
          total_data: total_data,
          data: data,
        };
    
        res.json(resjson);
      })
      .catch((err) => {
        console.error('Lỗi khi lấy dữ liệu:', err);
        const result = 0;
        const message = `Lỗi khi lấy dữ liệu: ${err}`;
        const total_data = 0;
        const data = [];
    
        const resjson = {
          result: result,
          message: message,
          total_data: total_data,
          data: data,
        };
    
        res.json(resjson);
      });
    }
}

module.exports = new showControllers();