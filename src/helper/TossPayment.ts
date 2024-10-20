import {
  loadTossPayments,
  TossPaymentsSDK,
} from '@tosspayments/tosspayments-sdk';
import Config from 'react-native-config';

class TossPayment {
  private tossPayments: TossPaymentsSDK | null = null;
  static instance: TossPayment | null = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new TossPayment();
    }
    return this.instance;
  }

  constructor() {
    this.init();
  }

  async init() {
    this.tossPayments = await loadTossPayments(
      // FIXME: Replace with your own Toss Payments API Key
      Config.TOSS_CLIENT_KEY,
    );
  }

  widget() {
    if (!this.tossPayments) {
      throw new Error('TossPayments is not initialized');
    }
    return this.tossPayments.widgets({
      customerKey: Config.TOSS_CUSTOMER_KEY,
    });
  }
}

const tossPayment = TossPayment.getInstance();

export default tossPayment;
