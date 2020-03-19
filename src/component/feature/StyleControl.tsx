import * as Device from 'expo-device';

export class StyleControl {
  static needPaddingBottom(): boolean {
    return /iPhone (11|12|X)/.test(Device.deviceName!);
  }
}
