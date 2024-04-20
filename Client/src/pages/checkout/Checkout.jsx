import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Step } = Steps;

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    message.success("Đặt hàng thành công!");
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
    {/* Header */}
    <div style={{ display: "flex",  marginBottom: 30, marginTop: 50 }}>
      <div style={{ marginRight: 20 }}>
        <ShoppingCartOutlined style={{ fontSize: 24 }} />
      </div>
      <h1 style={{ fontSize: 24, margin: 0 }}>Thanh toán</h1>
    </div>
    {/* Body */}
    <div>
      <Steps
        current={currentStep}
        direction="vertical"
        align="center"
        size="default"
        progressDot={{ size: 100 }}
      >
        <Step title="Xác nhận giỏ hàng" >
        </Step>
        <Step title="Chọn địa chỉ giao hàng">
        </Step>
        <Step title="Chọn phương thức thanh toán">
        </Step>
        <Step title="Hoàn tất đặt hàng">
        </Step>
      </Steps>
      <div style={{ marginTop: 30 }}>
          {/* Các nội dung và logic xử lý step tiếp theo */}
          {currentStep === 0 && (
            <div>
              <p>Xác nhận giỏ hàng</p>
              {/* Nội dung xác nhận giỏ hàng */}
              <Button type="primary" onClick={nextStep}>
                Tiếp tục
              </Button>
            </div>
          )}
          {currentStep === 1 && (
            <div>
              <p>Chọn địa chỉ giao hàng</p>
              {/* Nội dung chọn địa chỉ giao hàng */}
              <Button style={{ marginRight: 10 }} onClick={prevStep}>
                Quay lại
              </Button>
              <Button type="primary" onClick={nextStep}>
                Tiếp tục
              </Button>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <p>Chọn phương thức thanh toán</p>
              {/* Nội dung chọn phương thức thanh toán */}
              <Button style={{ marginRight: 10 }} onClick={prevStep}>
                Quay lại
              </Button>
              <Button type="primary" onClick={nextStep}>
                Tiếp tục
              </Button>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <p>Hoàn tất đặt hàng</p>
              {/* Nội dung hoàn tất đặt hàng */}
              <Button style={{ marginRight: 10 }} onClick={prevStep}>
                Quay lại
              </Button>
              <Button type="primary" onClick={handleFinish}>
                Đặt hàng
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
