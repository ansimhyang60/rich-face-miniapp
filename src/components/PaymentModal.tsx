import { useEffect, useRef, useState } from 'react';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'; // Toss Payments Test Key
const customerKey = 'test_customer_' + Math.random().toString(36).substring(2, 11);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const navigate = useNavigate();
  const unlockRealityReport = useUserStore(state => state.unlockRealityReport);
  
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);
  const [price] = useState(100);

  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      // 1. Initialize Payment Widget
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      paymentWidgetRef.current = paymentWidget;

      // 2. Render Payment Methods
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        { value: price },
        { variantKey: 'DEFAULT' }
      );
      paymentMethodsWidgetRef.current = paymentMethodsWidget;

      // 3. Render Agreement Widget
      paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });
    })();
  }, [isOpen, price]);

  const handlePayment = async () => {
    const paymentWidget = paymentWidgetRef.current;
    if (!paymentWidget) return;

    try {
      // 실제 환경에서는 백엔드로 검증 요청
      // 미니앱 환경에서는 window.location.href 리다이렉트 대비
      // 여기서는 성공 처리 Mocking
      await paymentWidget.requestPayment({
        orderId: 'ORDER_' + Math.random().toString(36).substring(2, 11),
        orderName: '리치 페이스 현타 리포트 열람권',
        successUrl: window.location.origin + '/reality',
        failUrl: window.location.origin + '/result',
      });
      
      // 모의(Mock) 성공 처리 (팝업 환경 시나리오)
      alert("결제가 완료되었습니다!");
      unlockRealityReport();
      onClose();
      navigate('/reality');
    } catch (error) {
      console.error(error);
      alert("결제가 취소되었습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
    }}>
      <div style={{
        backgroundColor: '#fff', 
        borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
        padding: '24px',
        maxHeight: '85vh', overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>100원 결제하기</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '24px' }}>&times;</button>
        </div>
        
        {/* Toss Payments UI Containers */}
        <div id="payment-widget" style={{ width: '100%' }} />
        <div id="agreement" style={{ width: '100%', marginBottom: '24px' }} />
        
        <button className="btn-primary" onClick={handlePayment}>
          100원 결제하고 리포트 보기
        </button>
      </div>
    </div>
  );
}
